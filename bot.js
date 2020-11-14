const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://ng-games.glitch.me/`);
}, 280000);

////////////////////

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Canvas = require("canvas");
const jimp = require("jimp");
const points = JSON.parse(fs.readFileSync("./Database/points.json", "utf8"));

//////////////////////
client.on("ready", () => {
  console.log(`Logged in ${client.user.tag}!`);
});
client.on("ready", () => {
  console.log(`${client.user.tag}`);
  console.log(`${client.guilds.size} Servers`);
  console.log(`${client.users.size} Members`);
  console.log(`${client.channels.size} Channels`);
  console.log(`[ ${client.guilds.map(g => g.name).join(", \n ")} ]`);
  client.user.setActivity(`${stat}`, { type: "streaming" });
});
/////////////////////|

const prefix = process.env.PREFIX;
const stat = process.env.STATUS;

////////////////////|

//var fs = require("fs"); // fs Package //
let prefixes = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));
const dol = "NAJMOU DEVELOPMENT";
client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.author.bot) return;
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };
  var prefix = prefixes[message.guild.id].prefix;
  var setp = prefixes[message.guild.id];
  if (message.content.startsWith(prefix + "setp")) {
    if (!message.member.hasPermission(`MANAGE_GUILD`))
      return message.reply(
        `**:x: Error: You do not have the required permissions: Manage Server.**`
      );

    let args = message.content.split(" ").slice(1);

    if (!args.join(" "))
      return message.reply(`**:x: Error: Say The Prefix Please.**`);
    const embed = new Discord.RichEmbed()

      .setColor("BLACK")
      .setTitle("Prefix Set!")
      .setDescription(`**Set to ${args[0]}**`);
    message.channel.send(embed);
    setp.prefix = args.join();
  }

  fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
    if (err) console.error(err);
  });
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "ping")) {
    if (!message.channel.guild) return;
    var msg = `${Date.now() - message.createdTimestamp}`;
    var api = `${Math.round(client.ping)}`;
    if (message.author.bot) return;
    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("**Time Taken:**", msg + " ms 📶 ")
      .addField("**WebSocket:**", api + " ms 📶 ")
      .setTimestamp();
    message.channel.send({ embed: embed });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      id: message.author.id
    };
  if (
    message.content.startsWith(prefix + "فكك") ||
    message.content.startsWith(prefix + "fkk")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));

    const type = require("./GamesData/fkk.json");
    const item = type[Math.floor(Math.random() * type.length)];
    let author = message.author;
    const filter = response => {
      return item.answers.some(
        answer => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel.send("**لديك __15__ ثانيه لتفكيك الكلمه**").then(msg => {
      const w = ["./img.png"]; //الخلفيه
      let Image = Canvas.Image,
        canvas = new Canvas(400, 150),
        ctx = canvas.getContext("2d");

      fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
        err,
        Background
      ) {
        if (err) return console.log(err);
        let BG = Canvas.Image;
        let ground = new Image();
        ground.src = Background;
        ctx.drawImage(ground, 0, 0, 400, 150);
      });
      let url = message.author.displayAvatarURL.endsWith(".webp")
        ? message.author.displayAvatarURL.slice(5, -20) + ".png"
        : message.author.displayAvatarURL;
      jimp.read(url, (err, ava) => {
        if (err) return console.log(err);
        ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
          if (err) return console.log(err);

          ctx.font = "20px Arial";
          ctx.fontSize = "10px";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.fillText(`${item.type} `, 250, 100);

          let Avatar = Canvas.Image;
          let ava = new Avatar();
          ava.src = buf;
          ctx.beginPath();
          ctx.arc(0, 0, 0, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(ava, 0, 0, 0, 0);
          message.channel.sendFile(canvas.toBuffer());
        });

        message.channel
          .awaitMessages(filter, {
            maxMatches: 1,
            time: 30000,
            errors: ["time"]
          }) //وقت الاجابة
          .then(collected => {
            var embed = new Discord.RichEmbed().setDescription(
              `${
                collected.first().author
              } ✅ احسنت لقد تمكنت من تفكيك الكلمه بسرعه`
            );
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x: لم يتمكن احد من تفكيك الكلمه في الوقت المناسب`
            );
            message.channel.send(embed1);
            console.log("[Typing] Error: No one type the word.");
          });
      });
    });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      id: message.author.id
    };
  if (
    message.content.startsWith(prefix + "لغز") ||
    message.content.startsWith(prefix + "puzzle")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));

    const type = require("./GamesData/quiz.json");
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {
      return item.answers.some(
        answer => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel.send("**لديك __15__ ثانيه لحل هذه اللغز**").then(msg => {
      const w = ["./img.png"]; //الخلفيه
      let Image = Canvas.Image,
        canvas = new Canvas(400, 150),
        ctx = canvas.getContext("2d");

      fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
        err,
        Background
      ) {
        if (err) return console.log(err);
        let BG = Canvas.Image;
        let ground = new Image();
        ground.src = Background;
        ctx.drawImage(ground, 0, 0, 400, 150);
      });
      let url = message.author.displayAvatarURL.endsWith(".webp")
        ? message.author.displayAvatarURL.slice(5, -20) + ".png"
        : message.author.displayAvatarURL;
      jimp.read(url, (err, ava) => {
        if (err) return console.log(err);
        ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
          if (err) return console.log(err);

          ctx.font = "20px Arial";
          ctx.fontSize = "10px";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.fillText(`${item.type} `, 250, 100);

          let Avatar = Canvas.Image;
          let ava = new Avatar();
          ava.src = buf;
          ctx.beginPath();
          ctx.arc(0, 0, 0, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(ava, 0, 0, 0, 0);
          message.channel.sendFile(canvas.toBuffer());
        });

        message.channel
          .awaitMessages(filter, {
            maxMatches: 1,
            time: 30000,
            errors: ["time"]
          }) //وقت الاجابة
          .then(collected => {
            var embed = new Discord.RichEmbed().setDescription(
              `${collected.first().author} ✅ احسنت لقت تمكنت من حل اللغز`
            );
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x:لم يتمكن احد من حل اللغز `
            );
            message.channel.send(embed1);
            console.log("[Typing] Error: No one type the word.");
          });
      });
    });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      id: message.author.id
    };
  if (
    message.content.startsWith(prefix + "ركب") ||
    message.content.startsWith(prefix + "rkb")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));

    const type = require("./GamesData/rkb.json");
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {
      return item.answers.some(
        answer => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel.send("**لديك __15__ ثانيه لتركيب الكلمه**").then(msg => {
      const w = ["./img.png"]; //الخلفيه
      let Image = Canvas.Image,
        canvas = new Canvas(400, 150),
        ctx = canvas.getContext("2d");

      fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
        err,
        Background
      ) {
        if (err) return console.log(err);
        let BG = Canvas.Image;
        let ground = new Image();
        ground.src = Background;
        ctx.drawImage(ground, 0, 0, 400, 150);
      });
      let url = message.author.displayAvatarURL.endsWith(".webp")
        ? message.author.displayAvatarURL.slice(5, -20) + ".png"
        : message.author.displayAvatarURL;
      jimp.read(url, (err, ava) => {
        if (err) return console.log(err);
        ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
          if (err) return console.log(err);

          ctx.font = "20px Arial";
          ctx.fontSize = "10px";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.fillText(`${item.type} `, 250, 100);

          let Avatar = Canvas.Image;
          let ava = new Avatar();
          ava.src = buf;
          ctx.beginPath();
          ctx.arc(0, 0, 0, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(ava, 0, 0, 0, 0);
          message.channel.sendFile(canvas.toBuffer());
        });

        message.channel
          .awaitMessages(filter, {
            maxMatches: 1,
            time: 30000,
            errors: ["time"]
          }) //وقت الاجابة
          .then(collected => {
            var embed = new Discord.RichEmbed().setDescription(
              `${collected.first().author} ✅ احسنت لقد ركبت الكلمة`
            );
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x: لم يتمكن احد من تركيب الكلمة`
            );
            message.channel.send(embed1);
            console.log("[Typing] Error: No one type the word.");
          });
      });
    });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      id: message.author.id
    };
  if (
    message.content.startsWith(prefix + "اسرع") ||
    message.content.startsWith(prefix + "fast")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));

    const type = require("./GamesData/type.json");
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {
      return item.answers.some(
        answer => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel
      .send("** لديك __15__ ثانيه لكتابه هذه الكلمه بسرعة**")
      .then(msg => {
        const w = ["./img.png"]; //الخلفيه
        let Image = Canvas.Image,
          canvas = new Canvas(400, 150),
          ctx = canvas.getContext("2d");

        fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
          err,
          Background
        ) {
          if (err) return console.log(err);
          let BG = Canvas.Image;
          let ground = new Image();
          ground.src = Background;
          ctx.drawImage(ground, 0, 0, 400, 150);
        });
        let url = message.author.displayAvatarURL.endsWith(".webp")
          ? message.author.displayAvatarURL.slice(5, -20) + ".png"
          : message.author.displayAvatarURL;
        jimp.read(url, (err, ava) => {
          if (err) return console.log(err);
          ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
            if (err) return console.log(err);

            ctx.font = "20px Arial";
            ctx.fontSize = "10px";
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "center";
            ctx.fillText(`${item.type} `, 250, 100);

            let Avatar = Canvas.Image;
            let ava = new Avatar();
            ava.src = buf;
            ctx.beginPath();
            ctx.arc(0, 0, 0, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(ava, 0, 0, 0, 0);
            message.channel.sendFile(canvas.toBuffer());
          });

          message.channel
            .awaitMessages(filter, {
              maxMatches: 1,
              time: 30000,
              errors: ["time"]
            }) //وقت الاجابة
            .then(collected => {
              var embed = new Discord.RichEmbed().setDescription(
                `${
                  collected.first().author
                } ✅ **احسنت لقد تمكنت من كتابه هذه الكلمه بسرعه**`
              );
              message.channel.send(embed);
              console.log(
                `[Typing] ${collected.first().author} typed the word.`
              );
              let won = collected.first().author;
              points[won.id].points++;
            })
            .catch(collected => {
              var embed1 = new Discord.RichEmbed().setDescription(
                `:x: **لم يتمكن احد من كتابه هذه الكلمه في الوقت المناسب**`
              );
              message.channel.send(embed1);
              console.log("[Typing] Error: No one type the word.");
            });
        });
      });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      id: message.author.id
    };
  if (
    message.content.startsWith(prefix + "رياضيات") ||
    message.content.startsWith(prefix + "math")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));

    const type = require("./GamesData/math.json");
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {
      return item.answers.some(
        answer => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel.send("**لديك __15__ ثانيه لحل المسئله**").then(msg => {
      const w = ["./img.png"]; //الخلفيه
      let Image = Canvas.Image,
        canvas = new Canvas(400, 150),
        ctx = canvas.getContext("2d");

      fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
        err,
        Background
      ) {
        if (err) return console.log(err);
        let BG = Canvas.Image;
        let ground = new Image();
        ground.src = Background;
        ctx.drawImage(ground, 0, 0, 400, 150);
      });
      let url = message.author.displayAvatarURL.endsWith(".webp")
        ? message.author.displayAvatarURL.slice(5, -20) + ".png"
        : message.author.displayAvatarURL;
      jimp.read(url, (err, ava) => {
        if (err) return console.log(err);
        ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
          if (err) return console.log(err);

          ctx.font = "20px Arial";
          ctx.fontSize = "10px";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.fillText(`${item.type} `, 250, 100);

          let Avatar = Canvas.Image;
          let ava = new Avatar();
          ava.src = buf;
          ctx.beginPath();
          ctx.arc(0, 0, 0, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(ava, 0, 0, 0, 0);
          message.channel.sendFile(canvas.toBuffer());
        });

        message.channel
          .awaitMessages(filter, {
            thing: true,
            maxMatches: 1,
            time: 60000,
            maxUses: 1,
            errors: ["time"]
          }) //وقت الاجابة
          .then(collected => {
            var embed = new Discord.RichEmbed().setDescription(
              `${
                collected.first().author
              } ✅ **احسنت لقد تمكنت من أجابه عن معادله بسرعه**`
            );
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x: **لم يتمكن احد من حل معادله في الوقت المناسب**`
            );
            message.channel.send(embed1);
            console.log("[Typing] Error: No one type the word.");
          });
      });
    });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      id: message.author.id
    };
  if (
    message.content.startsWith(prefix + "عواصم") ||
    message.content.startsWith(prefix + "capitals")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));

    const type = require("./GamesData/capital.json");
    const item = type[Math.floor(Math.random() * type.length)];
    let author = message.author;
    const filter = response => {
      return item.answers.some(
        answer => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel.send("**لديك __15__ لمعرفة العاصمه**").then(msg => {
      const w = ["./img.png"]; //الخلفيه
      let Image = Canvas.Image,
        canvas = new Canvas(400, 150),
        ctx = canvas.getContext("2d");

      fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
        err,
        Background
      ) {
        if (err) return console.log(err);
        let BG = Canvas.Image;
        let ground = new Image();
        ground.src = Background;
        ctx.drawImage(ground, 0, 0, 400, 150);
      });
      let url = message.author.displayAvatarURL.endsWith(".webp")
        ? message.author.displayAvatarURL.slice(5, -20) + ".png"
        : message.author.displayAvatarURL;
      jimp.read(url, (err, ava) => {
        if (err) return console.log(err);
        ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
          if (err) return console.log(err);

          ctx.font = "20px Arial";
          ctx.fontSize = "10px";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.fillText(`${item.type} `, 250, 100);

          let Avatar = Canvas.Image;
          let ava = new Avatar();
          ava.src = buf;
          ctx.beginPath();
          ctx.arc(70, 80, 63, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(ava, 0, 0, 0, 0);
          message.channel.sendFile(canvas.toBuffer());
        });

        message.channel
          .awaitMessages(filter, {
            maxMatches: 1,
            time: 30000,
            errors: ["time"]
          }) //وقت الاجابة
          .then(collected => {
            var embed = new Discord.RichEmbed().setDescription(
              `${collected.first().author} ✅ احسنت لقد تمكنت من معرفة العاصمه`
            );
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x: لم يتمكن احد من معرفة العاصمه`
            );
            message.channel.send(embed1);
            console.log("[Typing] Error: No one type the word.");
          });
      });
    });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (
    message.content == prefix + "brand" ||
    message.content == prefix + "شعار"
  ) {
    var x = [
      "https://cdn.discordapp.com/attachments/756329106953601225/776584216161812490/jW4dnFtA_400x400.png",
      "https://cdn.discordapp.com/attachments/756329106953601225/776589087997296691/InCS8dvy_400x400.png",
      "https://cdn.discordapp.com/attachments/756329106953601225/776590445622329344/ocZKRu9P_400x400.png",
      "https://cdn.discordapp.com/attachments/756329106953601225/776591027943243776/aCWlGSZF_400x400.png"
    ];
    var x2 = ["جافا", "ريزر", "يوتيوب", "جوجل كروم"];
    var x3 = Math.floor(Math.random() * x.length);
    var brand = new Discord.RichEmbed()
      .setImage(`${x[x3]}`)
      .setTitle(`**اسرع شخص يرسل الاشعار خلال __10__ ثواني**`);

    message.channel.sendEmbed(brand).then(msg1 => {
      var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
        maxMatches: 1,
        time: 20000,
        errors: ["time"]
      });
      r.catch(() => {
        return message.channel
          .send(`:negative_squared_cross_mark: لقد انتهى الوقت ولم يقم أحد بالأجابة بشكل صحيح 
         الصحيحةة هيا **${x2[x3]}**`);
      });

      r.then(collected => {
        message.channel.send(
          `${collected.first().author}You have solved the question🎉`
        );
      });
    });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (
    message.content == prefix + "flag" ||
    message.content == prefix + "اعلام"
  ) {
    var x = [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/256px-Flag_of_Brazil.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Jordan.svg/256px-Flag_of_Jordan.svg.png",
      "https://cdn.discordapp.com/attachments/756329106953601225/776908227476062258/images_4.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/1200px-Flag_of_Senegal.svg.png"
    ];
    var x2 = ["البرازيل", "الاردن", "مصر", "السنغال"];
    var x3 = Math.floor(Math.random() * x.length);
    var flag = new Discord.RichEmbed()
      .setImage(`${x[x3]}`)
      .setTitle(`**اسرع شخص يرسل العلم خلال __10__ ثواني**`);
    message.channel.sendEmbed(flag).then(msg1 => {
      var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
        maxMatches: 1,
        time: 20000,
        errors: ["time"]
      });
      r.catch(() => {
        return message.channel
          .send(`:negative_squared_cross_mark: **لقد انتهى الوقت ولم يقم أحد بالأجابة بشكل صحيح 
         الصحيحةة هيا** ***${x2[x3]}***`);
      });

      r.then(collected => {
        message.channel.send(
          `${collected.first().author}**لقد قمت بالاجابه بشكل صحيح**`
        );
      });
    });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

const cuttweet = [
  "كت تويت ‏| تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟",
  "كت تويت | أكثر شيء يُسكِت الطفل برأيك؟",
  "كت تويت | الحرية لـ ... ؟",
  "كت تويت | قناة الكرتون المفضلة في طفولتك؟",
  "كت تويت ‏| كلمة للصُداع؟",
  "كت تويت ‏| ما الشيء الذي يُفارقك؟",
  "كت تويت | موقف مميز فعلته مع شخص ولا يزال يذكره لك؟",
  "كت تويت ‏| أيهما ينتصر، الكبرياء أم الحب؟",
  "كت تويت | بعد ١٠ سنين ايش بتكون ؟",
  "كت تويت ‏| مِن أغرب وأجمل الأسماء التي مرت عليك؟",
  "‏كت تويت | عمرك شلت مصيبة عن شخص برغبتك ؟",
  "كت تويت | أكثر سؤال وجِّه إليك مؤخرًا؟",
  "‏كت تويت | ما هو الشيء الذي يجعلك تشعر بالخوف؟",
  "‏كت تويت | وش يفسد الصداقة؟",
  "‏كت تويت | شخص لاترفض له طلبا ؟",
  "‏كت تويت | كم مره خسرت شخص تحبه؟.",
  "‏كت تويت | كيف تتعامل مع الاشخاص السلبيين ؟",
  "‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟",
  "‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!",
  "‏كت تويت |أقوى كذبة مشت عليك ؟",
  "‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟",
  "كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟",
  "‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟",
  "‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟",
  "‏كت تويت | وش محتاج عشان تكون مبسوط ؟",
  "‏كت تويت | مطلبك الوحيد الحين ؟",
  "‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟"
];

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (
    message.content.startsWith(prefix + "cut") ||
    message.content.startsWith(prefix + "كت")
  ) {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");
    var embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .addField(
        "لعبه كت تويت",
        `${cuttweet[Math.floor(Math.random() * cuttweet.length)]}`
      );
    message.channel.sendEmbed(embed);

    console.log("[id] Send By: " + message.author.username);
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (
    message.content == prefix + "emoji" ||
    message.content == prefix + "ايموجي"
  ) {
    var x = ["🌚", "😂", "🥶", "😷", "🌻", "🌗", "✨", "🍐", "🚗", "💽"];
    var x2 = ["🌚", "😂", "🥶", "😷", "🌻", "🌗", "✨", "🍐", "🚗", "💽"];
    var x3 = Math.floor(Math.random() * x.length);
    var emoji = new Discord.RichEmbed()
      .setTitle(`** لديك __10 ثواني__ لكتابة الايموجي **`)
      .addField(`${x[x3]}`);
    message.channel.sendEmbed(emoji).then(msg1 => {
      var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
        maxMatches: 1,
        time: 20000,
        errors: ["time"]
      });
      r.catch(() => {
        return message.channel
          .send(`:negative_squared_cross_mark:** لقد انتهى الوقت ولم يقم أحد بالأجابة بشكل صحيح 
       الصحيحة هيا __${x2[x3]}__ **`);
      });

      r.then(collected => {
        message.channel.send(
          `${
            collected.first().author
          } ** لقد قمت بكتابة الايموجي في الوقت المناسب `
        );
      });
    });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (
    message.content.startsWith(prefix + "top") ||
    message.content.startsWith(prefix + "توب")
  ) {
    let _top = 1;
    let topp = Object.values(points);
    let top = topp
      .slice(0, 10)
      .map(
        users =>
          `**\`.${_top++}\` | <@${users.id}> \`Points: ${users.points}\`**`
      )
      .sort((a, b) => a > b)
      .join("\n");
    const prefixlor = new Discord.RichEmbed()
      .setTitle("Leaderboard")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(top, true);

    message.channel.sendEmbed(prefixlor);
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (
    message.content.startsWith(prefix + "نقاطي") ||
    message.content.startsWith(prefix + "points")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));
    let userData = points[message.author.id];
    let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag}`, message.author.avatarURL)
      .setDescription(`**Points:** \`${userData.points}\``);
    message.channel.sendEmbed(embed);
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "xo")) {
    let array_of_mentions = message.mentions.users.array();
    let symbols = [":o:", ":heavy_multiplication_x:"];
    var grid_message;

    if (array_of_mentions.length == 1 || array_of_mentions.length == 2) {
      let random1 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
      let random2 = Math.abs(random1 - 1);
      if (array_of_mentions.length == 1) {
        random1 = 0;
        random2 = 0;
      }
      var player1_id = message.author.id;
      let player2_id = array_of_mentions[random2].id;
      var turn_id = player1_id;
      var symbol = symbols[0];
      let initial_message = `اللعبة بين اللاعبين التاليين <@${player1_id}> and <@${player2_id}>!`;
      if (player1_id == player2_id) {
        initial_message += "\n_(لقد خسرت, العب مع نفسك :joy:)_";
      }
      message.channel
        .send(`Xo ${initial_message}`)
        .then(console.log("Successful tictactoe introduction"))
        .catch(console.error);
      message.channel
        .send(
          ":one::two::three:" +
            "\n" +
            ":four::five::six:" +
            "\n" +
            ":seven::eight::nine:"
        )
        .then(new_message => {
          grid_message = new_message;
        })
        .then(console.log("Successful tictactoe game initialization"))
        .catch(console.error);
      message.channel
        .send("Loading... Please wait for the :ok: reaction.")
        .then(async new_message => {
          await new_message.react("1⃣");
          await new_message.react("2⃣");
          await new_message.react("3⃣");
          await new_message.react("4⃣");
          await new_message.react("5⃣");
          await new_message.react("6⃣");
          await new_message.react("7⃣");
          await new_message.react("8⃣");
          await new_message.react("9⃣");
          await new_message.react("🆗");
          await new_message
            .edit(`It\'s <@${turn_id}>\'s اشتغل! الرمز هو ${symbol}`)
            .then(new_new_message => {
              require("./xo.js")(
                client,
                message,
                new_new_message,
                player1_id,
                player2_id,
                turn_id,
                symbol,
                symbols,
                grid_message
              );
            })
            .then(
              console.log("Successful tictactoe listeprefix initialization")
            )
            .catch(console.error);
        })
        .then(console.log("Successful tictactoe react initialization"))
        .catch(console.error);
    } else {
      message.channel
        .send(`جرب *xo @uesr`)
        .then(console.log("Successful error reply"))
        .catch(console.error);
    }
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", function(message) {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.content.startsWith(prefix + "rps")) {
    let messageArgs = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let messageRPS = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    let arrayRPS = ["**# - Rock**", "**# - Paper**", "**# - Scissors**"];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL)
      .addField("Rock", "🇷", true)
      .addField("Paper", "🇵", true)
      .addField("Scissors", "🇸", true);
    message.channel.send(RpsEmbed).then(msg => {
      msg.react("🇸");
      msg.react("🇷");
      msg
        .react("🇵")
        .then(() => msg.react("🇸"))
        .then(() => msg.react("🇷"))
        .then(() => msg.react("🇵"));
      let reaction1Filter = (reaction, user) =>
        reaction.emoji.name === "🇸" && user.id === message.author.id;
      let reaction2Filter = (reaction, user) =>
        reaction.emoji.name === "🇷" && user.id === message.author.id;
      let reaction3Filter = (reaction, user) =>
        reaction.emoji.name === "🇵" && user.id === message.author.id;
      let reaction1 = msg.createReactionCollector(reaction1Filter, {
        time: 12000
      });

      let reaction2 = msg.createReactionCollector(reaction2Filter, {
        time: 12000
      });
      let reaction3 = msg.createReactionCollector(reaction3Filter, {
        time: 12000
      });
      reaction1.on("collect", r => {
        message.channel.send(result);
      });
      reaction2.on("collect", r => {
        message.channel.send(result);
      });
      reaction3.on("collect", r => {
        message.channel.send(result);
      });
    });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === prefix + `8ball`) {
    if (!args[1]) return message.reply("Please ask a full question!");
    let replies = ["Yes", "No.", "I don't know.", "Ask again later plez."];

    let result = Math.floor(Math.random() * replies.length);
    let question = args.slice(1).join(" ");

    let ballembed = new Discord.RichEmbed()
      .setAuthor(message.author.tag)
      .addField("Question", question)
      .addField("Answer", replies[result]);

    message.channel.send(ballembed);
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;

  if (
    message.content.startsWith(prefix + "frots") ||
    message.content.startsWith(prefix + "فواكه")
  ) {
    let slot1 = ["🍏", "🍇", "🍒", "🍍", "🍅", "🍆", "🍑", "🍓"];
    let slots1 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let slots2 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let slots3 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let we;
    if (slots1 === slots2 && slots2 === slots3) {
      we = "Win!";
    } else {
      we = "Lose!";
    }
    message.channel.send(`${slots1} | ${slots2} | ${slots3} - ${we}`);
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

const Sra7a = [
  "صراحه  |  صوتك حلوة؟",
  "صراحه  |  التقيت الناس مع وجوهين؟",
  "صراحه  |  شيء وكنت تحقق اللسان؟",
  "صراحه  |  أنا شخص ضعيف عندما؟",
  "صراحه  |  هل ترغب في إظهار حبك ومرفق لشخص أو رؤية هذا الضعف؟",
  "صراحه  |  يدل على أن الكذب مرات تكون ضرورية شي؟",
  "صراحه  |  أشعر بالوحدة على الرغم من أنني تحيط بك كثيرا؟",
  "صراحه  |  كيفية الكشف عن من يكمن عليك؟",
  "صراحه  |  إذا حاول شخص ما أن يكرهه أن يقترب منك ويهتم بك تعطيه فرصة؟",
  "صراحه  |  أشجع شيء حلو في حياتك؟",
  'صراحه  |  طريقة جيدة يقنع حتى لو كانت الفكرة خاطئة" توافق؟',
  "صراحه  |  كيف تتصرف مع من يسيئون فهمك ويأخذ على ذهنه ثم ينتظر أن يرفض؟",
  "صراحه  |  التغيير العادي عندما يكون الشخص الذي يحبه؟",
  "صراحه  |  المواقف الصعبة تضعف لك ولا ترفع؟",
  "صراحه  |  نظرة و يفسد الصداقة؟",
  "صراحه  |  ‏‏إذا أحد قالك كلام سيء بالغالب وش تكون ردة فعلك؟",
  "صراحه  |  شخص معك بالحلوه والمُره؟",
  "صراحه  |  ‏هل تحب إظهار حبك وتعلقك بالشخص أم ترى ذلك ضعف؟",
  "صراحه  |  تأخذ بكلام اللي ينصحك ولا تسوي اللي تبي؟",
  "صراحه  |  وش تتمنى الناس تعرف عليك؟",
  "صراحه  |  ابيع المجرة عشان؟",
  "صراحه  |  أحيانا احس ان الناس ، كمل؟",
  "صراحه  |  مع مين ودك تنام اليوم؟",
  "صراحه  |  صدفة العمر الحلوة هي اني؟",
  'صراحه  |  الكُره العظيم دايم يجي بعد حُب قوي " تتفق؟',
  "صراحه  |  صفة تحبها في نفسك؟",
  'صراحه  |  ‏الفقر فقر العقول ليس الجيوب " ، تتفق؟',
  "صراحه  |  تصلي صلواتك الخمس كلها؟",
  "صراحه  |  ‏تجامل أحد على راحتك؟",
  "صراحه  |  اشجع شيء سويتة بحياتك؟",
  "صراحه  |  وش ناوي تسوي اليوم؟",
  "صراحه  |  وش شعورك لما تشوف المطر؟",
  "صراحه  |  غيرتك هاديه ولا تسوي مشاكل؟",
  "صراحه  |  ما اكثر شي ندمن عليه؟",
  "صراحه  |  اي الدول تتمنى ان تزورها؟",
  "صراحه  |  متى اخر مره بكيت؟",
  "صراحه  |  تقيم حظك ؟ من عشره؟",
  "صراحه  |  هل تعتقد ان حظك سيئ؟",
  "صراحه  |  شـخــص تتمنــي الإنتقــام منـــه؟",
  "صراحه  |  كلمة تود سماعها كل يوم؟",
  "صراحه  |  **هل تُتقن عملك أم تشعر بالممل؟",
  "صراحه  |  هل قمت بانتحال أحد الشخصيات لتكذب على من حولك؟",
  "صراحه  |  متى آخر مرة قمت بعمل مُشكلة كبيرة وتسببت في خسائر؟",
  "صراحه  |  ما هو اسوأ خبر سمعته بحياتك؟",
  "‏صراحه | هل جرحت شخص تحبه من قبل ؟",
  "صراحه  |  ما هي العادة التي تُحب أن تبتعد عنها؟",
  "‏صراحه | هل تحب عائلتك ام تكرههم؟",
  "‏صراحه  |  من هو الشخص الذي يأتي في قلبك بعد الله – سبحانه وتعالى- ورسوله الكريم – صلى الله عليه وسلم؟",
  "‏صراحه  |  هل خجلت من نفسك من قبل؟",
  "‏صراحه  |  ما هو ا الحلم  الذي لم تستطيع ان تحققه؟",
  "‏صراحه  |  ما هو الشخص الذي تحلم به كل ليلة؟",
  "‏صراحه  |  هل تعرضت إلى موقف مُحرج جعلك تكره صاحبهُ؟",
  "‏صراحه  |  هل قمت بالبكاء أمام من تُحب؟",
  "‏صراحه  |  ماذا تختار حبيبك أم صديقك؟",
  "‏صراحه  | هل حياتك سعيدة أم حزينة؟",
  "صراحه  |  ما هي أجمل سنة عشتها بحياتك؟",
  "‏صراحه  |  ما هو عمرك الحقيقي؟",
  "‏صراحه  |  ما اكثر شي ندمن عليه؟",
  "صراحه  |  ما هي أمنياتك المُستقبلية؟‏",
  "صراحه | نفسك فـ ايه ؟",
  "صراحه | هل تحب فتاه او احببت من قبل ؟",
  "صراحه | هل شكلك حلو او جيد او متوسط او سئ ؟",
  "صراحه | ما هي الماده الدراسيه التي تحبها اكثر وتفضلها؟",
  "صراحه | هل تحب مدرستك ؟",
  "صراحه | ما الشئ الذي تتمني ان يحصل ؟",
  "صراحه | هل تحب عائلتك ؟"
];
client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "sara7a")) {
    if (!message.channel.guild)
      return message.reply("** This command only for servers **");
    var client = new Discord.RichEmbed()
      .setTitle("لعبة صراحة ..")
      .setDescription(`${Sra7a[Math.floor(Math.random() * Sra7a.length)]}`)
      .setImage(
        "https://cdn.discordapp.com/attachments/371269161470525444/384103927060234242/125.png"
      )
      .setTimestamp();

    message.channel.sendEmbed(client);
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});


client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (
    message.content == prefix + "translation" ||
    message.content == prefix + "ترجمه"
  ) {
    var x = ["Constantinople","Clever","apple","day","browser","cocked","Tomatoes","Connect","coconut"];
    var x2 = ["القسطنطينيه","ذكي","تفاح","يوم","متصفح","مطبوخ","طماطم","اتصال","ك"];
    var x3 = Math.floor(Math.random() * x.length);
      var emoji = new Discord.RichEmbed()
    .setTitle(`** لديك __10 ثواني__ لكتابة الترجمه**`)
    .addField (`${x[x3]}`)
    message.channel.sendEmbed(emoji).then(msg1 => {
        var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
          maxMatches: 1,
          time: 20000,
          errors: ["time"]
        });
        r.catch(() => {
          return message.channel
            .send(`:negative_squared_cross_mark:** لقد انتهى الوقت ولم يقم أحد بالأجابة بشكل صحيح 
       الصحيحة هيا __${x2[x3]}__ **`);
        });

        r.then(collected => {
          message.channel.send(
            `${collected.first().author} ** لقد قمت بكتابة الايموجي في الوقت المناسب **`
          );
    
        });
      });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: process.env.PREFIX
    };

  var prefix = prefixes[message.guild.id].prefix;
  if (message.author.bot) return;
  if (message.content === prefix + "help") {
    let embed = new Discord.RichEmbed()

      .setColor("GREEN")
      .setDescription(
        `**~~=~~ Bot Orders | أوامر البوت ~~=~~
---------------------------------
🎮 - ${prefix}fkk - فكك

🎮 - ${prefix}rkb - ركب

🎮 - ${prefix}fast - اسرع

🎮 - ${prefix}math - رياضيات

🎮 - ${prefix}puzzle - لغز

🎮 - ${prefix}xo

🎮 - ${prefix}rps

🎮 - ${prefix}capitals - عواصم

🎮 - ${prefix}brand - شعار

🎮 - ${prefix}emoji - ايموجي

🎮 - ${prefix}flag - اعلام

🎮 - ${prefix}cut - كت

🎮 - ${prefix}8ball

🎮 - ${prefix}frots - فواكه

🎮 - ${prefix}sara7a - صراحه

🎮 - ${prefix}tanslation - ترجمه

🛠️ - ${prefix}top - توب

🛠️ - ${prefix}points - نقاطي

🛠️ - ${prefix}ping

🛠️ - ${prefix}setp
---------------------------------**`
      )
      .setFooter(`${dol}`);
    message.reply({ embed: embed });
  }
});
fs.writeFile("./Database/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.login(process.env.token);
