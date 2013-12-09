setZeroTimeout = new () ->
  timeouts = []
  messageName = "zero-timeout-message-" + new Date().getTime()

  zeroTimeoutsCount = 1000
  counter = 0
 
  handleMessage = (event) ->
    if event.data is messageName
      event.cancelBubble = true
      event.returnValue = false

      event.stopPropagation?()
      event.preventDefault?()

      if 0 < timeouts.length
        fn = timeouts.shift()
        fn()

 
  if window.addEventListener
    window.addEventListener "message", handleMessage, true

  else if window.attachEvent  # IE before version 9
    zeroTimeoutsCount = 0
    window.attachEvent "onmessage", handleMessage
 
  (fn) ->

    counter--
    
    # every 1000 iterations call old setTimeout.
    # To prevent errors in slow browsers like IE.

    if counter < 0
      counter = zeroTimeoutsCount
      return setTimeout fn, 10

    else
      timeouts.push fn
      return window.postMessage messageName, "*"