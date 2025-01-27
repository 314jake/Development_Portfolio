const responses = {
    actions: ['Titillate', 'Avoid', 'Blow up', 'Conjure', 'Consume', 'Imagine', 'Fold up', 'Hex', 'Dice', 'Clone'],
    objects: ['the Moon', 'a duck', 'six orphans', 'Cruella DeVille', 'the national rail system', 'myxomatosis', 'dog shit', 'the last of the whale people', 'Cliff Richard', 'a soul\'s light'],
    conditions: ['thrice', 'while in drag', 'on a Tuesday', 'calmly', 'loudly', 'without using your hands', 'for the glory', 'reluctantly', 'vigorously']
}

let missionNum = 0;

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function setMission() {
    action = pick(responses.actions);
    object = pick(responses.objects);
    condition = pick(responses.conditions);

    return `Mission ${missionNum}: ${action} ${object} ${condition}.`;
}

function getMission() {
    missionNum++;

    document.querySelector("#mission-generator-output").innerHTML += setMission() + "<br>";
}