set_zero_timeout = new () ->
  timeouts = []
  messageName = "zero-timeout-message-" + new Date().getTime()

  zero_timeouts_count = 1000
  counter = 0
 
  handle_message = (event) ->
    if event.data is messageName
      event.cancelBubble = true
      event.returnValue = false

      event.stopPropagation?()
      event.preventDefault?()

      if 0 < timeouts.length
        fn = timeouts.shift()
        fn()

 
  if window.addEventListener
    window.addEventListener "message", handle_message, true

  else if window.attachEvent  # IE before version 9
    zero_timeouts_count = 0
    window.attachEvent "onmessage", handle_message
 
  (fn) ->

    counter--
    
    # every 1000 iterations call old setTimeout.
    # To prevent errors in slow browsers like IE.

    if counter < 0
      counter = zero_timeouts_count
      return setTimeout fn, 10

    else
      timeouts.push fn
      return window.postMessage messageName, "*"