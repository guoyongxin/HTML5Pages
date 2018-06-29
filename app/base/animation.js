export function burst_in(query) {
    let jq = $(query);
    let seq = [
        { e: jq, p: { scale: 1.1 }, o: { duration: 250 } },
        { e: jq, p: { scale: 1 }, o: { duration: 250 } },
    ];
    $.Velocity.RunSequence(seq);
}

export function heartbeat(query) {
    let jq = $(query);
    let seq = [
        { e: jq, p: { scale: 1.05 }, o: { delay: 500, duration: 200 } },
        { e: jq, p: { scale: 1 }, o: { duration: 200 } },
        { e: jq, p: { scale: 1.05 }, o: { duration: 200 } },
        {
            e: jq, p: { scale: 1 }, o: {
                duration: 200, complete: () => {
                    $.Velocity.RunSequence(seq);
                }
            }
        },
    ];
    $.Velocity.RunSequence(seq);
}