class WorldClock
{
    constructor()
    {
        this.current_timezone = 'local';
        this.time_element = document.getElementById('time');
        this.date_element = document.getElementById('date');
        this.city_element = document.getElementById('selectedCity');
        this.timezone_selector = document.getElementById('timezoneSelector');
        this.theme_toggle = document.getElementById('themeToggle');
        
        this.timezone_map = {
            'local': 'Local Time',
            'UTC': 'UTC (GMT)',
            'America/New_York': 'New York',
            'America/Los_Angeles': 'Los Angeles',
            'America/Chicago': 'Chicago',
            'America/Denver': 'Denver',
            'America/Toronto': 'Toronto',
            'America/Sao_Paulo': 'São Paulo',
            'America/Mexico_City': 'Mexico City',
            'Europe/London': 'London',
            'Europe/Paris': 'Paris',
            'Europe/Berlin': 'Berlin',
            'Europe/Rome': 'Rome',
            'Europe/Madrid': 'Madrid',
            'Europe/Moscow': 'Moscow',
            'Asia/Tokyo': 'Tokyo',
            'Asia/Shanghai': 'Shanghai',
            'Asia/Seoul': 'Seoul',
            'Asia/Hong_Kong': 'Hong Kong',
            'Asia/Singapore': 'Singapore',
            'Asia/Dubai': 'Dubai',
            'Asia/Amman': 'Amman',
            'Asia/Kolkata': 'Mumbai',
            'Australia/Sydney': 'Sydney',
            'Australia/Melbourne': 'Melbourne',
            'Pacific/Auckland': 'Auckland',
            'Africa/Cairo': 'Cairo',
            'Africa/Johannesburg': 'Johannesburg',
            'Africa/Lagos': 'Lagos'
        };
        
        this.init();
    }
    
    init()
    {
        this.setup_event_listeners();
        this.initialize_theme();
        this.start_clock();
    }
    
    setup_event_listeners()
    {
        this.timezone_selector.addEventListener('change', (e) =>
        {
            this.current_timezone = e.target.value;
            this.update_city_display();
            this.update_time();
        });
        
        this.theme_toggle.addEventListener('click', () =>
        {
            this.toggle_theme();
        });
        
        document.querySelectorAll('.tab-btn').forEach(btn =>
        {
            btn.addEventListener('click', (e) =>
            {
                this.switch_tab(e.target.dataset.tab);
            });
        });
    }
    
    initialize_theme()
    {
        const saved_theme = localStorage.getItem('theme');
        if (saved_theme)
        {
            this.apply_theme(saved_theme);
        }
        else
        {
            this.apply_theme('light');
        }
    }
    
    toggle_theme()
    {
        const current_theme = document.documentElement.getAttribute('data-theme');
        const new_theme = current_theme === 'dark' ? 'light' : 'dark';
        this.apply_theme(new_theme);
        localStorage.setItem('theme', new_theme);
    }
    
    apply_theme(theme)
    {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    start_clock()
    {
        this.update_time();
        setInterval(() =>
        {
            this.update_time();
        }, 1000);
    }
    
    update_time()
    {
        const now = new Date();
        let display_time;
        
        if (this.current_timezone === 'local')
        {
            display_time = now;
        }
        else
        {
            try
            {
                display_time = new Date(now.toLocaleString("en-US", {timeZone: this.current_timezone}));
            }
            catch (error)
            {
                console.error('Invalid timezone:', this.current_timezone);
                display_time = now;
            }
        }
        
        const time_string = this.format_time(display_time);
        const date_string = this.format_date(display_time);
        
        this.time_element.textContent = time_string;
        this.date_element.textContent = date_string;
        
        this.time_element.classList.remove('tick');
        void this.time_element.offsetWidth;
        this.time_element.classList.add('tick');
    }
    
    format_time(date)
    {
        const options =
        {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        
        return (date.toLocaleTimeString('en-US', options));
    }
    
    format_date(date)
    {
        const options =
        {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        return (date.toLocaleDateString('en-US', options));
    }
    
    update_city_display()
    {
        const city_name = this.timezone_map[this.current_timezone] || 'Unknown';
        this.city_element.textContent = city_name;
    }
    
    switch_tab(tab_name)
    {
        document.querySelectorAll('.tab-btn').forEach(btn =>
        {
            btn.classList.remove('active');
        });
        const target_btn = document.querySelector(`[data-tab="${tab_name}"]`);
        if (target_btn)
        {
            target_btn.classList.add('active');
        }
        
        document.querySelectorAll('.tab-content').forEach(content =>
        {
            content.classList.remove('active');
        });
        const target_tab = document.getElementById(`${tab_name}-tab`);
        if (target_tab)
        {
            target_tab.classList.add('active');
        }
    }
}
