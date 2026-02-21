....
ques-1 ans:
getElementById() :
selects a single element using its unique id and returns only one element.
getElementsByClassName():
selects elements by class name and returns multiple elements as an HTMLCollection .

querySelector() :
selects the first matching element using any CSS selector, while querySelectorAll() selects all matching elements and returns a NodeList.

ques-2 ans:.
To create a new element, we use document.createElement(). Then we add content to it using innerText or innerHTML. After that, we insert it into the page using appendChild() or append().

ques-3 ans:
Event Bubbling is a process where an event starts from the target element and then moves upward to its parent elements.When we click a child element, the event first runs on that element, then on its parent, then on the body, and finally on the document.So, the event bubbles up from child to parent.

ques-4 ans:
Event Delegation means adding one event listener to a parent element instead of adding many listeners to child elements.Because events bubble up, the parent can handle events from its children.It is useful because it saves code, improves performance, and works for dynamically created elements.

        ques-5 ans:
preventDefault() stops the default action of an element.
        For example, it stops a form from submitting or a link from redirecting.
stopPropagation() stops the event from spreading to parent elements.
