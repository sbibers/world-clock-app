class History
{
    constructor()
    {
        this.timer_history_element = document.getElementById('timerHistory');
        this.stopwatch_history_element = document.getElementById('stopwatchHistory');
        this.clear_history_btn = document.getElementById('clearHistoryBtn');
        
        this.init();
    }
    
    init()
    {
        this.clear_history_btn.addEventListener('click', () => this.clear_all());
        
        window.addEventListener('historyUpdated', () => this.update_display());
        
        this.update_display();
    }
    
    update_display()
    {
        this.update_timer_display();
        this.update_stopwatch_display();
    }
    
    update_timer_display()
    {
        if (!this.timer_history_element)
        {
            return;
        }
        
        const history = this.load_timer_history();
        this.timer_history_element.innerHTML = '';
        
        if (history.length === 0)
        {
            this.timer_history_element.innerHTML = '<div class="history-empty">No timer completions yet</div>';
            return;
        }
        
        history.forEach(timer =>
        {
            const item = document.createElement('div');
            item.className = 'history-item';
            
            const duration = this.format_duration(timer.duration);
            const completed_at = new Date(timer.completed_at).toLocaleString();
            
            item.innerHTML = `
                <div class="history-item-info">
                    <div class="history-item-time">${duration}</div>
                    <div class="history-item-date">${completed_at}</div>
                </div>
                <div class="history-item-duration">
                    Set: ${timer.hours.toString().padStart(2, '0')}:${timer.minutes.toString().padStart(2, '0')}:${timer.seconds.toString().padStart(2, '0')}
                </div>
            `;
            
            this.timer_history_element.appendChild(item);
        });
    }
    
    update_stopwatch_display()
    {
        if (!this.stopwatch_history_element)
        {
            return;
        }
        
        const history = this.load_stopwatch_history();
        this.stopwatch_history_element.innerHTML = '';
        
        if (history.length === 0)
        {
            this.stopwatch_history_element.innerHTML = '<div class="history-empty">No stopwatch sessions yet</div>';
            return;
        }
        
        history.forEach(session =>
        {
            const item = document.createElement('div');
            item.className = 'history-item';
            
            const duration = this.format_duration(session.total_time);
            const completed_at = new Date(session.end_time).toLocaleString();
            const lap_count = session.laps.length;
            
            item.innerHTML = `
                <div class="history-item-info">
                    <div class="history-item-time">${duration}</div>
                    <div class="history-item-date">${completed_at}</div>
                </div>
                <div class="history-item-duration">
                    ${lap_count} lap${lap_count !== 1 ? 's' : ''}
                </div>
            `;
            
            this.stopwatch_history_element.appendChild(item);
        });
    }
    
    format_duration(milliseconds)
    {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        if (hours > 0)
        {
            return (`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`);
        }
        else
        {
            return (`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`);
        }
    }
    
    load_timer_history()
    {
        try
        {
            const stored = localStorage.getItem('worldClockTimerHistory');
            return (stored ? JSON.parse(stored).map(timer => ({
                ...timer,
                completed_at: new Date(timer.completed_at)
            })) : []);
        }
        catch (error)
        {
            console.error('Error loading timer history:', error);
            return ([]);
        }
    }
    
    load_stopwatch_history() {
        try
        {
            const stored = localStorage.getItem('worldClockStopwatchHistory');
            return (stored ? JSON.parse(stored).map(session => ({
                ...session,
                start_time: new Date(session.start_time),
                end_time: new Date(session.end_time),
                laps: session.laps.map(lap => ({
                    ...lap,
                    timestamp: new Date(lap.timestamp)
                }))
            })) : []);
        }
        catch (error)
        {
            console.error('Error loading stopwatch history:', error);
            return ([]);
        }
    }
    
    clear_all()
    {
        localStorage.removeItem('worldClockTimerHistory');
        localStorage.removeItem('worldClockStopwatchHistory');
        this.update_display();
        
        const original_text = this.clear_history_btn.textContent;
        this.clear_history_btn.textContent = 'Cleared!';
        this.clear_history_btn.style.background = '#28a745';
        
        setTimeout(() =>
        {
            this.clear_history_btn.textContent = original_text;
            this.clear_history_btn.style.background = '';
        }, 2000);
    }
}
