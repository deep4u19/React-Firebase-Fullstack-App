const functions = require('firebase-functions');
const admin= require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

const createNotification=(notification)=>{
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(
            doc=>{
                console.log('Notification added',doc);
            }
        );
}

exports.projectCreated=functions.firestore
    .document('projects/{projectId}')
    .onCreate(
        doc=>{
            const project=doc.data();
            const notification={
                content:'Added a new post',
                user:`${project.authorFirstName} ${project.authorLastName}`,
                time:admin.firestore.FieldValue.serverTimestamp()
            }
        return createNotification(notification);

        }
        
    )

exports.userJoined=functions.auth.user()
    .onCreate(user=>{
        return admin.firestore().collection('users')
        .doc(user.uid).get()
        .then(doc=>{
            const details=doc.data();
            const notification={
                content:'New User Joined',
                user:`${details.firstName} ${details.lastName}`,
                time:admin.firestore.FieldValue.serverTimestamp()
            }
            return createNotification(notification);
        })
    })