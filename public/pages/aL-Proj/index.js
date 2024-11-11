const animateDot = (linkSelector, dotSelector) => {
    const dot = $(dotSelector);

    $(linkSelector).on("mouseover", () => {
        dot.animate({ scale: 1 }, 300, "swing");
    });

    $(linkSelector).on("mouseout", () => {
        dot.animate({ scale: 0 }, 300, "swing");
    });
};

animateDot(".top-header-link#about", ".dot#about");
animateDot(".top-header-link#archive", ".dot#archive");