KISSY.add("event", function(S, Event, Target) {
    Event.Target = Target;
    return Event;
}, {
    requires:[
        "event/base",
        "event/target",
        "event/object",
        "event/focusin",
        "event/mouseenter"]
});