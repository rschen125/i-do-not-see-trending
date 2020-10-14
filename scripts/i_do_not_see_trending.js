/*
On Twitter, sidebarColumn element mounts only when window width is wide, and
it completely unmounts when window width is narrow (the element gets removed).
We'll need two interval checks, one initiated on page load, and one on resize.
I'm much too lazy to check for margin lengths.
And, like, hopefully the user doesn't play with window sizes a whole lot?

*/

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};


const offendingAriaLabel = 'Timeline: Trending now';

// the thing
function lookForElements() {
	const matches = $('div[aria-label="'+ offendingAriaLabel +'"]');
	if (matches.length > 0) {
		matches[0].remove();
	}
}

const looking = setInterval(lookForElements, 250);

// make function to clear looking interval
function stopLooking() {
	clearInterval(looking);
	console.log('stopped looking');
}

$(window).on('unload', stopLooking);
