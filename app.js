/* Global Variables */
const baseurl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "32929599c5935d7f7b59bb1faa9b30e9";
const server = "http://Rowan:3000";

let d = new Date();
let newDate = d.toDateString();

function append_to_div(div_name, data) {
  document.getElementById(div_name).innerHTML += data;
}
document.getElementById("generate").addEventListener("click", async () => {
  const feelings = document.getElementById("feelings").value;
  const zip = document.getElementById("zip").value;
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    console.log(data);

    const temp = data.main.temp;
    const city = data.name;
    const obj = {
      date: newDate,
      temp,
      content,
      city,
    };
    append_to_div("entryHolder", "zip = " + zip);
    append_to_div("content", " feeling is " + feelings);
    append_to_div("temp", " temp is " + temp);
    append_to_div("date", " date is " + newDate);
    append_to_div("city", "city is " + city);
    // post data.

    await fetch("/savingData", {
      mode: "no-cors",
      method: "POST",
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    //get data
    const serverRes = await fetch("/getData", { credentials: "same-origin" });
    const serverData = await serverRes.json();
    console.log(serverData);
  } catch (err) {
    console.log(err);
  }
});

//get project data and update UI.
const updatingUI = async () => {
  await fetch("/all");
  try {
    const savedData = await res.json();

    document.getElementById("date").innerHTML = savedData.newDate;
    document.getElementById("city").innerHTML = savedData.city;
    document.getElementById("temp").innerHTML = savedData.temp;
    document.getElementById("content").innerHTML = savedData.feelings;
  } catch (error) {
    console.log(error);
  }
};
