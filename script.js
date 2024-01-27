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

// toggle burger menu 
const toggleBurgerMenu = () => {
    const burger = document.querySelector('.burger');
    const burgerLine = document.querySelectorAll('.burger_line');
    const navlinks = document.querySelector('header .general_navs_div');

    burger.addEventListener('click', (e) => {
        e.stopPropagation();

        burgerLine[0].classList.toggle('burger_line1');
        burgerLine[1].classList.toggle('burger_line2');
        burgerLine[2].classList.toggle('burger_line3');

        navlinks.classList.toggle('show_header_nav');
    });

    // Click event on the document
    document.documentElement.addEventListener('click', () => {
        // Close the navigation menu if it's open
        if (navlinks.classList.contains('show_header_nav')) {
            navlinks.classList.remove('show_header_nav');
            burgerLine.forEach(line => line.classList.remove('burger_line1', 'burger_line2', 'burger_line3'));
        }
    });
};

toggleBurgerMenu();
// 

//update todays date 
const displayCurrentDate = document.querySelector('.todays_date');
const currentDate = new Date();

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);

displayCurrentDate.innerText = formattedDate;
//

//toggle user profile name to show/hide on specified media query
const userHeaderProfile = document.querySelector('.title_section .user_div');
const userNameDetail = document.querySelector('.user_div .user_name');
const userNameDetailParagraph = document.querySelector('.user_div .user_name p');

function toggleUserDetails() {
    userHeaderProfile.addEventListener('click', (e) => {
        e.stopPropagation();

        userNameDetail.classList.toggle('show_user_name')
    })
};

const mediaQueryWidth = window.matchMedia('(max-width: 940px)');
toggleUserDetails();

mediaQueryWidth.addEventListener('change', toggleUserDetails);

document.documentElement.addEventListener('click', () => {

    if(userNameDetail.classList.contains('show_user_name')) {
        userNameDetail.classList.remove('show_user_name');
    } else {
        return
    }
})
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
// 

//switch theme color
const themeColorContainer = document.querySelector('.theme_color');
const themeColorButtons = document.querySelectorAll('.theme_color button');
const lightTheme = themeColorButtons[0];
const darkTheme = themeColorButtons[1];

//grab bg color and color 
const header = document.querySelector('header');
const headerDiv = document.querySelector('header .general_navs_div');
const headerContainer = document.querySelector('header .container');
const whiteBgElements = document.querySelectorAll('.white_bg');

themeColorButtons.forEach(themeColorButton => {
    themeColorButton.addEventListener('click', (e) => {
        const currentTheme = e.target;


        console.log(currentTheme)
        if(currentTheme === lightTheme) {
            darkTheme.setAttribute('aria-current', 'false');
            lightTheme.setAttribute('aria-current', 'true');

            document.body.style.backgroundColor = '#FAFAFA';
            document.documentElement.style.setProperty('--clr-primary', '#26282C')
            header.style.backgroundColor = '#FFFFFF';
            headerDiv.style.backgroundColor = '#F7F8FA';
            headerContainer.style.backgroundColor = '#F7F8FA';
            whiteBgElements.forEach(whiteBgElement => {
                whiteBgElement.style.backgroundColor = '#FFFFFF';
            });
            themeColorContainer.style.backgroundColor = '#FFFFFF';
            userNameDetailParagraph.style.color = '#26282C';

        } 
        
        if(currentTheme === darkTheme) {
            lightTheme.setAttribute('aria-current', 'false');
            darkTheme.setAttribute('aria-current', 'true');
            
            document.body.style.backgroundColor = '#092544';
            document.documentElement.style.setProperty('--clr-primary', '#FFFFFF');
            header.style.backgroundColor = '#092544';
            headerDiv.style.backgroundColor = '#092544';
            headerContainer.style.backgroundColor = '#092544';
            whiteBgElements.forEach(whiteBgElement => {
                whiteBgElement.style.backgroundColor = '#092544'
            });
            themeColorContainer.style.backgroundColor = '#092544';
            userNameDetailParagraph.style.color = '#092544';
        } 
    })
});
//