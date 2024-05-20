import inquirer from "inquirer";
import chalk from "chalk";
class student {
    ID: number;
    name: string;
    coursesEnrolled: string[];
    fee_Amount: number = 0;
    constructor(ID: number, name: string, coursesEnrolled: string[], feeAmount: number) {
        this.ID = ID;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.fee_Amount = feeAmount;
    }
}
let baseID = 10000;
let studentid: number;
let students: student[] = [];
do {
    const action = await inquirer.prompt({
        type: "list",
        name: "allopt",
        message: "please select an action",
        choices: [
            "Enroll", "view student details", "exit"
        ]
    })
    if (action.allopt === "Enroll") {
        let askname = await inquirer.prompt({
            type: "input",
            name: "entername",
            message: "please enter your name:"
        })
        let trimstudentname = (askname.entername).trim()
        let studentnamecheck = students.map((obj) => obj.name)
        if (studentnamecheck.includes(trimstudentname) === false) {
            if (trimstudentname !== "") {
                baseID++
                studentid = baseID;
                console.log("\nyour account has been created\n");

                let courses = await inquirer.prompt({
                    type: "list",
                    name: "selectcourse",
                    message: "please select a course",
                    choices: [
                        "[web development]", "[Graphic designing]", "[Internet and things]"
                    ]
                })
                let course_fee = 0;
                switch (courses.selectcourse) {
                    case "[web development]":
                        course_fee = 3000;
                        break;

                    case "[Graphic designing]":
                        course_fee = 5000;
                        break;

                    case "[Internet and things]":
                        course_fee = 4000;
                        break;
                }
                let confirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Are u sure u want to enroll in this course?"
                })
                if (confirm.ans === true) {
                    let addStudent = new student(studentid, trimstudentname, [courses.selectcourse], course_fee)
                    students.push(addStudent)
                    console.log("Your sucessfully enrolled in this course");

                }
            } else {
                console.log(chalk.red("invalid name"));
            }
        } else {
            console.log(chalk.red("Name already taken"));

        }

    }
    else if (action.allopt === "view student details") {
        console.table(students);
        if (students.length === 0) {
            console.log(chalk.red("Records are empty please enroll first :("));
        }

    }
    else if (action.allopt === "exit") {
        console.log("have a nice day (^-^)");
        process.exit(0)

    }
}
while (true)
