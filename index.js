class Initiate {
    constructor(val) {
        if (val > 0) {
            this.type = "button"
            this.value = val
        } else {
            this.type = "space"
            this.direction = null
            this.value = 2
        }
    }
}

class MalInitiate {
    constructor(obj, value) {
        if (obj.type === "space") {
            this.type = "space"
            this.value = value
            this.direction = obj.direction
        } else {
            this.type = "button"
            this.value = value
        }
    }
}

function loop(arr) {
    let resp = []
    for (let i = 0; i < arr.length; i++) {
        let temp = []
        for (let j = 0; j < arr[0].length; j++) {
            let foo = new Initiate(arr[i][j])
            temp.push(foo)
        }
        resp.push(temp)
    }
    return resp
}

function solve(question) {
    let arr = loop(question)

    iterate()

    function iterate() {
        let changed = false
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if (arr[i][j].type === "button" && arr[i][j].value > 0) {
                    let resp = doSomething(i, j)
                    if (resp === true) {
                        changed = true
                    }
                }
            }
        }
        if (!changed) {
            return checkIfSolved()
        }
        return iterate()
    }


    function doSomething(i, j) {
        let directions = Array(4)
        directions[0] = checkRight(i, j)
        directions[1] = checkLeft(i, j)
        directions[2] = checkTop(i, j)
        directions[3] = checkBottom(i, j)

        let possibleBridges = directions[0] + directions[1] + directions[2] + directions[3]
        if (possibleBridges === arr[i][j].value) {
            return drawLines(i, j, directions)
        }
        let sorted = [...directions]
        sorted.sort()
        let oneBridgeArr = directions.map(e => {
            if (e > 1) {
                return 1
            }
            return 0
        })
        let currValues = 0
        for (let i = 0; i < 3; i++) {
            currValues += sorted[i]
        }
        if (currValues >= arr[i][j].value || sorted[3] !== 2) {
            return false
        }
        if (currValues + sorted[3] - 1 === arr[i][j].value) {
            return drawLines(i, j, oneBridgeArr)
        }
        console.log("Error: reached dead end")
        process.exit()
    }

    function printSolution(arr) {
        let resp = []
        for (let i = 0; i < arr.length; i++) {
            let temp = []
            for (let j = 0; j < arr[0].length; j++) {
                if (arr[i][j].type === "space") {
                    let direction = arr[i][j].direction
                    if (direction === 0) {
                        if (arr[i][j].value === 1) {
                            temp.push("-")
                            continue
                        }
                        temp.push("=")
                        continue
                    }
                    if (direction === 1) {
                        if (arr[i][j].value === 1) {
                            temp.push("|")
                            continue
                        }
                        temp.push(`"`)
                        continue
                    }
                    temp.push(" ")
                } else {
                    temp.push(question[i][j].toString())
                }
            }
            resp.push(temp)
        }
        console.log(resp)
        return
    }

    function checkRight(p, q) {
        let spaceBridgeCount
        for (let j = q + 1; j < arr[0].length; j++) {
            if (arr[p][j].type === "button") {
                if (j === q + 1) {
                    console.log("Invalid problem")
                    process.exit()
                }
                if (arr[p][j].value > 0) {
                    return getPossibleBridgeCount(arr[p][q], arr[p][j], spaceBridgeCount)
                }
                break
            } else {
                spaceBridgeCount = countBridge(p, j, spaceBridgeCount)
                if (arr[p][j].direction === 1 || arr[p][j].value === 0) {
                    break
                }
            }
        }
        return 0
    }

    function countBridge(i, j, spaceBridgeCount) {
        if (!spaceBridgeCount) {
            spaceBridgeCount = arr[i][j].value
        }
        return spaceBridgeCount
    }

    function getPossibleBridgeCount(start, end, bridgeCount) {
        if (start instanceof MalInitiate || end instanceof MalInitiate || start.value > 2 || end.value > 2) {
            return Math.min(bridgeCount, start.value, end.value)
        }
        if (start.value === 1 && end.value === 1) {
            return 0
        }
        return 1
    }

    function checkLeft(p, q) {
        let spaceBridgeCount
        for (let j = q - 1; j > -1; j--) {
            if (arr[p][j].type === "button") {
                if (j === q - 1) {
                    console.log("Invalid problem")
                    process.exit()
                }
                if (arr[p][j].value > 0) {
                    return getPossibleBridgeCount(arr[p][q], arr[p][j], spaceBridgeCount)
                }
                break
            } else {
                spaceBridgeCount = countBridge(p, j, spaceBridgeCount)
                if (arr[p][j].direction === 1 || arr[p][j].value === 0) {
                    break
                }
            }
        }
        return 0
    }

    function checkTop(p, q) {
        let spaceBridgeCount
        for (let i = p - 1; i > -1; i--) {
            if (arr[i][q].type === "button") {
                if (i === p - 1) {
                    console.log("Invalid problem")
                    process.exit()
                }
                if (arr[i][q].value > 0) {
                    return getPossibleBridgeCount(arr[p][q], arr[i][q], spaceBridgeCount)
                }
                break
            } else {
                spaceBridgeCount = countBridge(i, q, spaceBridgeCount)
                if (arr[i][q].direction === 0 || arr[i][q].value === 0) {
                    break
                }
            }
        }
        return 0
    }

    function checkBottom(p, q) {
        let spaceBridgeCount
        for (let i = p + 1; i < arr.length; i++) {
            if (arr[i][q].type === "button") {
                if (i === p + 1) {
                    console.log("Invalid problem")
                    process.exit()
                }
                if (arr[i][q].value > 0) {
                    return getPossibleBridgeCount(arr[p][q], arr[i][q], spaceBridgeCount)
                }
                break
            } else {
                spaceBridgeCount = countBridge(i, q, spaceBridgeCount)
                if (arr[i][q].direction === 0 || arr[i][q].value === 0) {
                    break
                }
            }
        }
        return 0
    }

    function drawLines(p, q, directions) {
        return drawRight(directions[0])

        function assignValue(g, h, value) {
            if (value > -1) {
                arr[g][h] = new MalInitiate(arr[g][h], value)
                return
            }
            console.log("Error:assignValue", [p, q], [g, h], value)
            process.exit()
        }

        function drawRight(lines) {
            if (lines > 0) {
                let valueToBeassigned = arr[p][q].value - lines
                assignValue(p, q, valueToBeassigned)
                for (let j = q + 1; j < arr[0].length; j++) {
                    valueToBeassigned = arr[p][j].value - lines
                    assignValue(p, j, valueToBeassigned)
                    if (arr[p][j].type === "button") {
                        break
                    } else {
                        arr[p][j].direction = 0
                    }
                }
            }
            return drawLeft(directions[1])
        }

        function drawLeft(lines) {
            if (lines > 0) {
                let valueToBeassigned = arr[p][q].value - lines
                assignValue(p, q, valueToBeassigned)
                for (let j = q - 1; j > -1; j--) {
                    valueToBeassigned = arr[p][j].value - lines
                    assignValue(p, j, valueToBeassigned)
                    if (arr[p][j].type === "button") {
                        break
                    } else {
                        arr[p][j].direction = 0
                    }
                }
            }
            return drawTop(directions[2])
        }

        function drawTop(lines) {
            if (lines > 0) {
                let valueToBeassigned = arr[p][q].value - lines
                assignValue(p, q, valueToBeassigned)
                for (let i = p - 1; i > -1; i--) {
                    valueToBeassigned = arr[i][q].value - lines
                    assignValue(i, q, valueToBeassigned)
                    if (arr[i][q].type === "button") {
                        break
                    } else {
                        arr[i][q].direction = 1
                    }
                }
            }
            return drawBottom(directions[3])
        }

        function drawBottom(lines) {
            if (lines > 0) {
                let valueToBeassigned = arr[p][q].value - lines
                assignValue(p, q, valueToBeassigned)
                for (let i = p + 1; i < arr.length; i++) {
                    valueToBeassigned = arr[i][q].value - lines
                    assignValue(i, q, valueToBeassigned)
                    if (arr[i][q].type === "button") {
                        break
                    } else {
                        arr[i][q].direction = 1
                    }
                }
            }
            return true
        }
    }

    function checkIfSolved() {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if (arr[i][j].type === "button") {
                    if (arr[i][j].value > 0) {
                        console.log("Invalid problem")
                        process.exit()
                    }
                }
            }
        }
        printSolution(arr)
    }
}

module.exports = {
    solve
}
