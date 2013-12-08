set_zero_timeout = new () ->
  timeouts = []
  messageName = "zero-timeout-message-" + new Date().getTime()

  zero_timeouts_count = 1000
  counter = 0

  # every 1000 times call old setTimeout.
  # To prevent errors in slow browsers like IE.

  set_zero_timeout = (fn) ->

    counter--
    
    if counter < 0
      counter = zero_timeouts_count
      return setTimeout fn, 10

    else
      timeouts.push fn
      return window.postMessage messageName, "*"
 
  handle_message = (event) ->
    if event.data is messageName
      event.cancelBubble = true
      event.returnValue = false

      if event.stopPropagation
        event.stopPropagation()

      if event.preventDefault
        event.preventDefault()

      if 0 < timeouts.length
        fn = timeouts.shift()
        fn()

 
  if window.addEventListener
    window.addEventListener "message", handle_message, true

  else if window.attachEvent  # IE before version 9
    zero_timeouts_count = 0
    window.attachEvent "onmessage", handle_message

  reserved_names.push "set_zero_timeout"
 
  set_zero_timeout