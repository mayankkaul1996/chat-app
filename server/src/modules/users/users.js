const textUsers = [];
const videoUsers = [];



class Users {

    static addUser({ id, name, room, type }) {
        try {

            name = name.trim().toLowerCase();
            room = room.trim().toLowerCase();

            let users;
            type == 'TEXT' ? (users = textUsers) : (users = videoUsers);

            const existingUser = users.find(user => user.room == room && user.name == name);

            //ToDo :- throw err instead of returning the value
            if (existingUser) return { error: 'UserName is taken' };

            const user = { id, name, room };

            users.push(user);

            return user;

        } catch (err) {
            console.error('[CHAT] Users : addUser : ', err);
            throw err;
        }
    }

    static removeUser(id, type) {
        try {

            let users;
            type == 'TEXT' ? (users = textUsers) : (users = videoUsers);

            const index = users.findIndex(user => user.id == id);

            if (index != -1) return users.splice(index, 1)[0];

            console.log(`[CHAT] Users : removeUser : User[id : ${id}] doesnt Exist`);
            return;

        } catch (err) {
            console.error('[CHAT] Users : removeUser : ', err);
            throw err;
        }
    }

    static getUser(id, type) {
        try {

            let users;
            type == 'TEXT' ? (users = textUsers) : (users = videoUsers);

            return users.find(user => user.id == id);

        } catch (err) {
            console.error('[CHAT] Users : getUser : ', err);
            throw err;
        }
    }

    static getUsersInRoom(room, type) {
        try {

            let users;
            type == 'TEXT' ? (users = textUsers) : (users = videoUsers);

            return users.filter(user => user.room == room);

        } catch (err) {
            console.error('[CHAT] Users : getUsersInRoom : ', err);
            throw err;
        }
    }

}


module.exports = Users;