// import { Injectable } from '@angular/core';
// import {
//     AngularFirestoreDocument,
//     AngularFirestore,
//     AngularFirestoreCollection
// } from 'angularfire2/firestore';
// import { config } from './config';

// import { pipe, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { User } from './../models/user.model';
// @Injectable()

// // NoT USE ANyMORE THIS SHIT CODE ARE You  !!!!!!!!!!!!!!!!

// //                   ____
// //                  _.' :  `._
// //              .-.'`.  ;   .'`.-.
// //     __      / : ___\ ;  /___ ; \      __
// //   ,'_ ""--.:__;".-.";: :".-.":__;.--"" _`,
// //   :' `.t""--.. '<@.`;_  ',@>` ..--""j.' `;
// //        `:-.._J '-.-'L__ `-- ' L_..-;'
// //          "-.__ ;  .-"  "-.  : __.-"
// //              L ' /.------.\ ' J
// //               "-.   "--"   .-"
// //              __.l"-:_JL_;-";.__
// //           .-j/'.;  ;""""  / .'\"-.
// //         .' /:`. "-.:     .-" .';  `.
// //      .-"  / ;  "-. "-..-" .-"  :    "-.
// //   .+"-.  : :      "-.__.-"      ;-._   \
// //   ; \  `.; ;                    : : "+. ;
// //   :  ;   ; ;                    : ;  : \:
// //  : `."-; ;  ;                  :  ;   ,/;
// //   ;    -: ;  :                ;  : .-"'  :
// //   :\     \  : ;             : \.-"      :
// //    ;`.    \  ; :            ;.'_..--  / ;
// //    :  "-.  "-:  ;          :/."      .'  :
// //      \       .-`.\        /t-""  ":-+.   :
// //       `.  .-"    `l    __/ /`. :  ; ; \  ;
// //         \   .-" .-"-.-"  .' .'j \  /   ;/
// //          \ / .-"   /.     .'.' ;_:'    ;
// //           :-""-.`./-.'     /    `.___.'
// //                 \ `t  ._  /
// //                  "-.t-._:'
// export class UserService {
//     usersCollection: AngularFirestoreCollection<any> = this.db.collection<User>(
//         config.users_endpoint
//     );
//     userDocument: AngularFirestoreDocument<any>;
//     usersObservable: Observable<any>;

//     constructor(public db: AngularFirestore) {}

//     getAllUsers() {
//         // this.db
//         //     .collection(config.users_endpoint)
//         //     .get()
//         //     .subscribe(querySnapshot => {
//         //         querySnapshot.forEach(doc => {
//         //             console.log(doc.data());
//         //         });
//         //     });
//         return this.db
//             .collection(config.users_endpoint)
//             .snapshotChanges()
//             .pipe(
//                 map(actions => {
//                     return actions.map(a => {
//                         // Get document data
//                         const data = a.payload.doc.data() as User;
//                         // Get document id
//                         const id = a.payload.doc.id;
//                         // Use spread operator to add the id to the document data
//                         return { id, ...data };
//                     });
//                 })
//             );
//     }

//     updateUser(id: string, update: User) {
//         this.userDocument = this.db.doc<User>(`${config.users_endpoint}/${id}`);
//         this.userDocument.update({ ...User.modelToJson(update) });
//     }

//     addUser(user: User) {
//         // return this.usersCollection.add(JSON.parse(JSON.stringify(user)));
//         // koristimo ... spred operator da raspodelimo polja u objekat. posto ovo sranje samo tako oce da radi. ne prima reference
//         return this.usersCollection.add({ ...User.modelToJson(user) });
//     }

//     removeUser(id: string) {
//         this.userDocument = this.db.doc<User>(`${config.users_endpoint}/${id}`);
//         this.userDocument.delete();
//     }

//     getUser(id: string): User {
//         return undefined;
//     }
// }
