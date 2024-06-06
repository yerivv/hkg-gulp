const itemIndex = a => {
    let items = [...a.parentElement.children];
    return items.indexOf(a);
};

const insertAfter = (a, b) => {
    a.parentElement.insertBefore(b, a.nextSibling);
};

// blocking blank link
$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
    return false;
});