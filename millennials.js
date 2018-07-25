function replaceMillennials(node) {
  node.nodeValue = node.nodeValue
    .replace(/Millennials/g, "Adults Under 40")
    .replace(/millennials/g, "adults under 40")
    .replace(/Millennial/, "Adult Under 40")
    .replace(/millennial/, "adult under 40");
}

function walkTree(root) {
  var walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        if (/millennial/i.test(node.nodeValue)) return NodeFilter.FILTER_ACCEPT;
        else return NodeFilter.FILTER_REJECT;
      }
    },
    false
  );

  var node;
  while ((node = walker.nextNode())) {
    replaceMillennials(node);
  }
}

function enableObserver(observer) {
  observer.observe(document, {
    subtree: true,
    characterData: true,
    childList: true
  });
}

function observerCallback(mutationsList) {
  for (var mutation of mutationsList) {
    if (!/millennial/i.test(mutation.target.innerHTML)) return;
    observer.disconnect();
    switch (mutation.type) {
      case "characterData":
        replaceMillennials(mutation.target);
        break;
      case "childList":
        walkTree(mutation.target);
        break;
    }
    enableObserver(observer);
  }
}

walkTree(document);
var observer = new MutationObserver(observerCallback);
enableObserver(observer);
