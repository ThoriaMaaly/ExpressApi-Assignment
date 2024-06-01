const express = require('express');
const app = express();
app.use(express.json());
let fs = require("fs");
let members = JSON.parse(fs.readFileSync("./members.json"))
let trainers = JSON.parse(fs.readFileSync("./trainers.json"))

//****************get all revenues of all members members****** */

app.get('/allRevenues', (req, res, next) => {
    let rev = 0;
    for (var i = 0; i < members.length; i++) {
        rev += members[i].Membership.cost
    }
    res.status(200).json(rev)

    next();
})


//**get revnues of specific trainer  ************* */

app.get('/trainerRevenue/:id', (req, res, next) => {
    let id = req.params.id;
    let memberIdx = members.findIndex((member) => {
        return member.TrainerId == id;
    })
    let speReve = members[memberIdx].Membership.cost

    res.status(200).json(speReve);


})

//**Add new member************* */
app.post('/members', (req, res, next) => {

    let newMember = req.body;
    members.push(newMember);

    fs.writeFileSync("./members.json", JSON.stringify(members))

    res.status(201).json({ 'message': "member added succesfully" })
})
// **************Get All Members And their trainer************
app.get('/allMembers', (req, res, next) => {
    let allMembers = [...members]
    for (var i = 0; i < allMembers.length; i++) {

        let MembersTrainer = trainers.filter((trainer) => {
            return trainer.Id == allMembers[i].TrainerId;

        })

        //**Creating new prop */
        allMembers[i].Trainers = MembersTrainer;
    }
    res.status(200).json(allMembers)

    next();
})
// **************Get Specific Member detect his membership status************
app.get('/members/:id', (req, res, next) => {
    let id = req.params.id;

    let memberIdx = members.findIndex((member) => {
        return member.Id == id;
    })


    if (members[memberIdx].Status.active == true) {
        res.status(200).json(members[memberIdx])

    }
    else {
        res.status(200).json({ "message": `“this member is not allowed to enter the gym”` })
    }

    next();
})



// **************update member************


app.put('/members/:id', (req, res, next) => {

    let id = req.params.id;
    let memberIdx = members.findIndex((member) => {
        return member.Id == id;
    })

    members[memberIdx].Name = req.body.Name;
    members[memberIdx].Membership = req.body.Membership;
    members[memberIdx].TrainerId = req.body.TrainerId;

    fs.writeFileSync('./members.json', JSON.stringify(members))
    console.log(req.body.Name)
    res.status(200).json({ "message": memberIdx })
    next();

})
// **************Delete member************


app.delete('/members/:id', (req, res, next) => {

    let id = req.params.id;
    let memberIdx = members.findIndex((member) => {
        return member.Id == id;
    })
    members.splice(memberIdx, 1);

    fs.writeFileSync('./members.json', JSON.stringify(members))

    res.status(200).json({ "message": "member is removed" })
    next();

})
//**Add new Trainer************* */
app.post('/trainers', (req, res, next) => {

    let newTrainer = req.body;
    trainers.push(newTrainer);

    fs.writeFileSync("./trainers.json", JSON.stringify(trainers))

    res.status(201).json({ 'message': "trainer added succesfully" })
})

// **************Get All Trainers And Trainer's Member************
app.get('/allTrainers', (req, res, next) => {
    let allTrainers = [...trainers]
    for (var i = 0; i < allTrainers.length; i++) {

        let TrainerMembers = members.filter((mem) => {
            return mem.TrainerId == allTrainers[i].Id;

        })

        //**Creating new prop */
        allTrainers[i].Members = TrainerMembers;
    }
    res.status(200).json(allTrainers)

    next();
})



// **************update trainer************


app.put('/trainers/:id', (req, res, next) => {

    let id = req.params.id;
    let trainerIdx = trainers.findIndex((trainer) => {
        return trainer.Id == id;
    })

    trainers[trainerIdx].Name = req.body.Name;
    trainers[trainerIdx].Duration = req.body.Duration;


    fs.writeFileSync('trainers.json', JSON.stringify(trainers))
    res.status(200).json({ "message": "trainer updated" })
    next();

})
// **************Delete trainer************


app.delete('/trainers/:id', (req, res, next) => {

    let id = req.params.id;
    let trainerIdx = trainers.findIndex((trainer) => {
        return trainer.Id == id;
    })
    trainers.splice(trainerIdx, 1);

    fs.writeFileSync('./trainers.json', JSON.stringify(trainers))

    res.status(200).json({ "message": "trainer is removed" })
    next();

})

//*******Get aspecific Trainer And its Members */

app.get('/trainerMembers/:id', (req, res, next) => {
    let id = req.params.id;

    let trainerIdx = trainers.findIndex((trainer) => {
        return trainer.Id == id;
    })

    let filterdMembers = members.filter((member) => {
        return member.TrainerId == trainers[trainerIdx].Id
    })
    trainers[trainerIdx].Members = filterdMembers;
    res.status(200).json(trainers[trainerIdx])
    next();
})

app.listen(3000, (
    console.log("server is running now...."))



)