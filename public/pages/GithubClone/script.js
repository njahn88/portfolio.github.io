const menuIcons = document.querySelectorAll('.navContainer')

menuIcons.forEach((icon) => {
    icon.addEventListener('mouseout', () => {
        icon.classList.remove('active')
    })
    icon.addEventListener('mouseover', () => {
        icon.classList.add('active')
    })
})