var redis = require("redis"),
    client = redis.createClient();
 
client.on("error", function (err) {
    console.log("Error " + err);
});
 
client.set('hoge', 23, (err) => {
  if (err) throw new Error(err)
  console.log('set')
})

client.get('hoge', (err, ret) => {
  if (err) throw new Error(err)
  console.log('get', ret)
  client.quit();
})

