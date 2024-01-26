//navigate between between header nav links
const navLinks = document.querySelectorAll('.general_navs_div nav a');

navLinks.forEach(navLink => {
    navLink.addEventListener('click', (e) => {
        const currentLink = e.target;

        //remove aria-current and .active_link from other links
        navLinks.forEach(otherNavLink => {
            if (otherNavLink.getAttribute('aria-current') === 'true') {
                otherNavLink.setAttribute('aria-current', 'false');
                otherNavLink.classList.remove('active_link');
            }
        })

        //add style to currently clicked link
        if(currentLink.getAttribute('aria-current') === 'true') {
            navLink.classList.add('active_link');
            return
        } else {
            currentLink.setAttribute('aria-current', 'true');
            navLink.classList.add('active_link');
        }
    });
});
//

//sales trend bar chart
const salesTrendChartFunc = () => {
    const salesTrendChart = document.getElementById('bar_chart').getContext('2d');
    const gradientBarBg = salesTrendChart.createLinearGradient(0, 0, 0, 300);

    gradientBarBg.addColorStop(0.5, '#34CAA5');
    gradientBarBg.addColorStop(1, 'rgba(52, 202, 165, 0.00)');

    new Chart(salesTrendChart, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            width: 500,
            datasets: [{
            data: [12.000, 19.000, 30.000, 15.000, 20.000, 45.000, 20.000, 50.000, 33.000, 20.00, 36.000, 10.000],
            borderWidth: 0,
            borderRadius: 100,
            backgroundColor: ['rgba(52, 202, 165, 0.10)'],
            hoverBackgroundColor: gradientBarBg
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
    
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    // grace: 2,
                    min: 0.00,
                    // max: 50.000,
                    ticks: {
                        stepSize: 10,
                        callback: (value) => {
                            return value.toFixed(3);
                        }
                    },
                    grid: {
                        color: '#EAEAEA',
                        drawTicks: false,
                        drawOnChartArea: true,
                    },
                    border: {
                        display: false,
                        dash: [6, 3]
                    }
                },
                
                x: {
                    grid: {
                        display: false,
                        drawOnChartArea: false,
                    },
                    border: {
                        display: false,
                    }
                }
            }
        }
    });
};

salesTrendChartFunc();
// //