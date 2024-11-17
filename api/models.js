const express = require('express');
const cors = require('cors')
const { Sequelize, DataTypes, Model } = require('sequelize');

const app = express();

const sequelize = new Sequelize('postgresql://marvelousdb_owner:wdOZCBMr02Yv@ep-raspy-rain-a5ouk4dv.us-east-2.aws.neon.tech/marvelousdb?sslmode=require')

const corsOptions = {
    origin: 'https://marvelous-91080.web.app/', // Change this to your frontend URL in production
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.options('*', (req, res) => {
    res.sendStatus(200);
});
app.use(express.json());    // To parse JSON bodies

class User extends Model { }
User.init(
    {
        userID: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        profileIMG: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: 'User',
    }
);

class ReadingList extends Model { }

ReadingList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        comicID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comicIMG: {
            type: DataTypes.STRING,
        },
        comicTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'ReadingList',
    }
);

class Favorite extends Model { }

Favorite.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        comicID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comicIMG: {
            type: DataTypes.STRING,
        },
        comicTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Favorite',
    }
);

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        comicID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Comment',
    }
);


User.hasOne(ReadingList, {
    foreignKey: 'userId',
    as: 'readingList'
});

ReadingList.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasOne(Favorite, {
    foreignKey: 'userId',
    as: 'favorite'
});

Favorite.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    as: 'comments'
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

// const syncModels = async () => {
//     try {
//         await sequelize.sync();
//         console.log('All models were synchronized successfully.');
//     } catch (error) {
//         console.error('Error synchronizing models:', error);
//     }
// };

app.get('/api/test', (req, res) => {
    res.json({ message: 'CORS setup test successful!' });
});


app.get('/api/Users/:userID', async (req, res) => {
    try {
        const specificUser = await User.findOne({
            where: {
                userID: req.params.userID
            }
        });

        if (specificUser) {
            res.json(specificUser);
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/Users', async (req, res) => {
    try {
        const { userID, name, email, profileIMG } = req.body;
        const user = await User.create({ userID, name, email, profileIMG });
        res.json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/Users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post('/api/Favorites', async (req, res) => {
    try {
        const { comicID, comicIMG, comicTitle, userId } = req.body;

        const findComic = await Favorite.findOne({
            where: {
                comicID: comicID,
                userId: userId
            }
        })

        if (findComic) {
            res.json({
                message: `${comicTitle} already in Favorites`
            })
        } else {
            const comicInfo = await Favorite.create({ comicID, comicIMG, comicTitle, userId });
            res.json({
                comicInfo: comicInfo,
                message: `${comicTitle} successfully added to Favorites!`
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/api/Favorites/:userId', async (req, res) => {
    try {
        const specificUserFavorites = await Favorite.findAll({
            where: {
                userId: req.params.userId
            }
        });

        if (specificUserFavorites) {
            res.json({ favorites: specificUserFavorites })
        } else {
            res.status(404).json({ message: 'Favorites Not Found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post('/api/Favorites/delete', async (req, res) => {
    try {
        const { userId, comicID } = req.body;
        const comicToDelete = await Favorite.destroy({
            where: {
                userId: userId,
                comicID: comicID
            }
        })

        const favoriteList = await Favorite.findAll({
            where: {
                userId: userId
            }
        })


        res.json({
            favorites: favoriteList,
            message: 'Comic successfully removed from favorites.'
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.post('/api/ReadingLists', async (req, res) => {
    try {
        const { comicID, comicIMG, comicTitle, userId } = req.body;

        const findComic = await ReadingList.findOne({
            where: {
                comicID: comicID,
                userId: userId
            }
        })

        if (findComic) {
            res.json({
                message: `${comicTitle} already in Reading List`
            })
        } else {
            const comicInfo = await ReadingList.create({ comicID, comicIMG, comicTitle, userId });
            res.json({
                comicInfo: comicInfo,
                message: `${comicTitle} successfully added to your Reading List!`
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/api/ReadingLists/:userId', async (req, res) => {
    try {
        const specificUserList = await ReadingList.findAll({
            where: {
                userId: req.params.userId
            }
        });

        if (specificUserList) {
            res.json({ list: specificUserList })
        } else {
            res.status(404).json({ message: 'Reading List Not Found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post('/api/ReadingLists/delete', async (req, res) => {
    try {
        const { userId, comicID } = req.body;
        const comicToDelete = await ReadingList.destroy({
            where: {
                userId: userId,
                comicID: comicID
            }
        })

        const readingList = await ReadingList.findAll({
            where: {
                userId: userId
            }
        })


        res.json({
            favorites: readingList,
            message: 'Comic successfully removed from ReadingList.'
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


app.post('/api/Comments', async (req, res) => {
    try {
        const { comicID, comment, name, userId } = req.body;

        const comicComment = await Comment.create({ comicID, comment, name, userId })
        res.json({
            comicComment: comicComment,
            message: `Comment successfully added!`
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/api/Comments/:comicID', async (req, res) => {
    try {
        const comicComments = await Comment.findAll({
            where: {
                comicID: req.params.comicID
            }
        })

        if (comicComments) {
            res.json({
                comicComments: comicComments
            })
        } 
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post('/api/Comments/delete', async (req, res) => {
    try {
        const { userId, comicID, commentID} = req.body
        const commentToDelete = await Comment.destroy({
            where: {
                id: commentID,
                comicID: comicID, 
                userId: userId
            }
        })

        res.json({
            message: 'Comment successfully deleted!'
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

