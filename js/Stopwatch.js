class Stopwatch
{
    constructor()
    {
        this.stopwatch_time = 0;
        this.stopwatch_interval = null;
        this.is_stopwatch_running = false;
        this.lap_times = [];
        this.stopwatch_session =
        {
            start_time: null,
            end_time: null,
            total_time: 0,
            laps: []
        };
        
        this.stopwatch_time_element = document.getElementById('stopwatchTime');
        this.start_stop_btn = document.getElementById('startStopBtn');
        this.reset_stopwatch_btn = document.getElementById('resetStopwatchBtn');
        this.lap_btn = document.getElementById('lapBtn');
        this.lap_times_container = document.getElementById('lapTimes');
        
        this.init();
    }
    
    init()
    {
        this.start_stop_btn.addEventListener('click', () => this.toggle());
        this.reset_stopwatch_btn.addEventListener('click', () => this.reset());
        this.lap_btn.addEventListener('click', () => this.add_lap());
    }
    
    toggle()
    {
        if (this.is_stopwatch_running)
        {
            this.stop();
        }
        else
        {
            this.start();
        }
    }
    
    start()
    {
        this.is_stopwatch_running = true;
        this.start_stop_btn.textContent = 'Stop';
        this.lap_btn.disabled = false;
        this.stopwatch_session.start_time = new Date();
        this.stopwatch_session.laps = [];
        
        this.stopwatch_interval = setInterval(() =>
        {
            this.stopwatch_time += 10;
            this.update_display();
        }, 10);
    }
    
    stop() {
        this.is_stopwatch_running = false;
        this.start_stop_btn.textContent = 'Start';
        this.lap_btn.disabled = true;
        this.stopwatch_session.end_time = new Date();
        this.stopwatch_session.total_time = this.stopwatch_time;
        
        this.save_session();
        
        if (this.stopwatch_interval)
        {
            clearInterval(this.stopwatch_interval);
            this.stopwatch_interval = null;
        }
    }
    
    reset()
    {
        this.stop();
        this.stopwatch_time = 0;
        this.lap_times = [];
        this.update_display();
        this.update_lap_times();
    }
    
    add_lap()
    {
        if (this.is_stopwatch_running)
        {
            this.lap_times.push(this.stopwatch_time);
            this.stopwatch_session.laps.push({
                time: this.stopwatch_time,
                timestamp: new Date()
            });
            this.update_lap_times();
        }
    }
    
    update_display() {
        const hours = Math.floor(this.stopwatch_time / 3600000);
        const minutes = Math.floor((this.stopwatch_time % 3600000) / 60000);
        const seconds = Math.floor((this.stopwatch_time % 60000) / 1000);
        const milliseconds = Math.floor((this.stopwatch_time % 1000) / 10);
        
        this.stopwatch_time_element.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }
    
    update_lap_times() 
    {
        this.lap_times_container.innerHTML = '';
        
        this.lap_times.forEach((lap_time, index) => {
            const hours = Math.floor(lap_time / 3600000);
            const minutes = Math.floor((lap_time % 3600000) / 60000);
            const seconds = Math.floor((lap_time % 60000) / 1000);
            const milliseconds = Math.floor((lap_time % 1000) / 10);
            
            const lap_item = document.createElement('div');
            lap_item.className = 'lap-item';
            lap_item.innerHTML = `
                <span class="lap-number">Lap ${index + 1}</span>
                <span>${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}</span>
            `;
            
            this.lap_times_container.appendChild(lap_item);
        });
    }
    
    save_session() 
    {
        const stopwatch_data = 
        {
            id: Date.now(),
            start_time: this.stopwatch_session.start_time,
            end_time: this.stopwatch_session.end_time,
            total_time: this.stopwatch_session.total_time,
            laps: this.stopwatch_session.laps,
            duration: this.stopwatch_session.end_time - this.stopwatch_session.start_time
        };
        
        const history = this.load_history();
        history.unshift(stopwatch_data);
        
        if (history.length > 20) 
        {
            history.splice(20);
        }
        
        try
        {
            localStorage.setItem('worldClockStopwatchHistory', JSON.stringify(history));
            window.dispatchEvent(new Event('historyUpdated'));
        }
        catch (error)
        {
            console.error('Error saving stopwatch history:', error);
        }
    }
    
    load_history()
    {
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
}
