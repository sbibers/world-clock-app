class Timer
{
    constructor()
    {
        this.timer_time = 0;
        this.timer_interval = null;
        this.is_timer_running = false;
        
        this.timer_time_element = document.getElementById('timerTime');
        this.hours_input = document.getElementById('hoursInput');
        this.minutes_input = document.getElementById('minutesInput');
        this.seconds_input = document.getElementById('secondsInput');
        this.start_timer_btn = document.getElementById('startTimerBtn');
        this.reset_timer_btn = document.getElementById('resetTimerBtn');
        
        this.init();
    }
    
    init()
    {
        this.start_timer_btn.addEventListener('click', () => this.toggle());
        this.reset_timer_btn.addEventListener('click', () => this.reset());
        
        [this.hours_input, this.minutes_input, this.seconds_input].forEach(input => {
            input.addEventListener('input', () => this.validate_input(input));
        });
    }
    
    validate_input(input)
    {
        const value = parseInt(input.value);
        const max = input.id === 'hoursInput' ? 23 : 59;
        
        if (value > max)
        {
            input.value = max;
        }
        else if (value < 0) 
        {
            input.value = 0;
        }
    }
    
    toggle()
    {
        if (this.is_timer_running)
        {
            this.stop();
        }
        else
        {
            this.start();
        }
    }
    
    start() {
        const hours = parseInt(this.hours_input.value) || 0;
        const minutes = parseInt(this.minutes_input.value) || 0;
        const seconds = parseInt(this.seconds_input.value) || 0;
        
        this.timer_time = (hours * 3600 + minutes * 60 + seconds) * 1000;
        
        if (this.timer_time <= 0)
        {
            alert('Please set a valid timer duration');
            return;
        }
        
        this.is_timer_running = true;
        this.start_timer_btn.textContent = 'Stop';
        this.hours_input.disabled = true;
        this.minutes_input.disabled = true;
        this.seconds_input.disabled = true;
        
        this.timer_interval = setInterval(() =>
        {
            this.timer_time -= 100;
            this.update_display();
            
            if (this.timer_time <= 0)
            {
                this.complete();
            }
        }, 100);
    }
    
    stop()
    {
        this.is_timer_running = false;
        this.start_timer_btn.textContent = 'Start';
        this.hours_input.disabled = false;
        this.minutes_input.disabled = false;
        this.seconds_input.disabled = false;
        
        if (this.timer_interval)
        {
            clearInterval(this.timer_interval);
            this.timer_interval = null;
        }
    }
    
    reset()
    {
        this.stop();
        this.timer_time = 0;
        this.hours_input.value = 0;
        this.minutes_input.value = 0;
        this.seconds_input.value = 0;
        this.update_display();
    }
    
    update_display()
    {
        const total_seconds = Math.ceil(this.timer_time / 1000);
        const hours = Math.floor(total_seconds / 3600);
        const minutes = Math.floor((total_seconds % 3600) / 60);
        const seconds = total_seconds % 60;
        
        this.timer_time_element.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    complete()
    {
        this.stop();
        this.timer_time_element.classList.add('timer-alert');
        
        this.save_completion();
        
        this.play_notification_sound();
        
        setTimeout(() =>
        {
            this.timer_time_element.classList.remove('timer-alert');
        }, 3000);
    }
    
    play_notification_sound()
    {
        const audio_context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audio_context.createOscillator();
        const gain_node = audio_context.createGain();
        
        oscillator.connect(gain_node);
        gain_node.connect(audio_context.destination);
        
        oscillator.frequency.setValueAtTime(800, audio_context.currentTime);
        gain_node.gain.setValueAtTime(0.3, audio_context.currentTime);
        gain_node.gain.exponentialRampToValueAtTime(0.01, audio_context.currentTime + 0.5);
        
        oscillator.start(audio_context.currentTime);
        oscillator.stop(audio_context.currentTime + 0.5);
    }
    
    save_completion()
    {
        const timer_data =
        {
            id: Date.now(),
            duration: this.timer_time,
            completed_at: new Date(),
            hours: parseInt(this.hours_input.value) || 0,
            minutes: parseInt(this.minutes_input.value) || 0,
            seconds: parseInt(this.seconds_input.value) || 0
        };
        
        const history = this.load_history();
        history.unshift(timer_data);
        
        if (history.length > 50)
        {
            history.splice(50);
        }
        
        try
        {
            localStorage.setItem('worldClockTimerHistory', JSON.stringify(history));
            window.dispatchEvent(new Event('historyUpdated'));
        }
        catch (error)
        {
            console.error('Error saving timer history:', error);
        }
    }
    
    load_history()
    {
        try
        {
            const stored = localStorage.getItem('worldClockTimerHistory');
            return (stored ? JSON.parse(stored) : []);
        }
        catch (error)
        {
            console.error('Error loading timer history:', error);
            return ([]);
        }
    }
}
