var Accordion = (function () {

    var accordionItems = [];

    // Grab the accordion items from the page
    function getAccordion() {
        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length; i++) {
            if (divs[i].className == 'accordionItem' || divs[i].className == 'accordionItem show') accordionItems.push(divs[i]);
        }
    }

    // Assign onclick events to the accordion item headings
    function initEvents() {
        for (var i = 0; i < accordionItems.length; i++) {
            var h2 = getFirstChildWithTagName(accordionItems[i], 'h2');
            h2.addEventListener('click', toggleItem);
        }
    }

    // Hide all accordion item bodies except the first
    function clearContent() {
        for (var i = 0; i < accordionItems.length; i++) {
            if (accordionItems[i].className == 'accordionItem show') {
                return;
            }
            accordionItems[i].className = 'accordionItem';
        }
    }

    // Toggle
    function toggleItem() {
        var itemClass  = this.parentNode.className;
        var ulHideList = getFirstChildWithTagName(this.parentNode, 'div').children[0];
        var liHide     = ulHideList.children;

        for (var j = 0; j < liHide.length; j++) {
            var currentLi = liHide[j];

            currentLi.style.display = 'none';
        }

        // Hide all items
        for (var i = 0; i < accordionItems.length; i++) {
            var currentAccordion       = accordionItems[i];
            currentAccordion.className = 'accordionItem';

        }

        // Show this item if it was previously hidden
        if (itemClass == 'accordionItem') {
            this.parentNode.className = 'accordionItem show';

            var ulList     = getFirstChildWithTagName(this.parentNode, 'div').children[0];
            var liElements = ulList.children;

            for (var k = 0; k < liElements.length; k++) {

                (function () {
                    var j = k;
                    setTimeout(function () {
                        fadeIn(liElements[j]);
                    }, j * 40);
                })();
            }
        }
    }

    // Get first element with tag
    function getFirstChildWithTagName(element, tagName) {
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeName.toLowerCase() == tagName) return element.childNodes[i];
        }
    }

    // Fade element
    function fadeIn(el, display) {
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    }

    return {
        Init: function () {
            getAccordion();
            clearContent();
            initEvents();
        }
    };

});