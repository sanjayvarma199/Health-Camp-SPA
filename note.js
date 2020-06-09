var db=null;

connectToDB = function()
{
db=window.openDatabase('Cmpe280','1.0','Cmpebase',3*1024*1024);
};

createTable = function()
{
  db.transaction(function(tx){
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS spap_detail (Name TEXT, Age INTEGER, Gender TEXT, Photo VARBINARY, Medics TEXT, Notes TEXT)", [],
      function(){ alert('spap_detail database created successfully!'); },
      function(tx, error){ alert(error.message); } );
  });
};

insertDemo = function(Name, Age, Gender,img) {
  localStorage.setItem('Name', Name);
  localStorage.setItem('Age',Age);
  localStorage.setItem('Gender', Gender);
  localStorage.setItem('image', img);
};

insertVitals = function(Medics, Notes) {
  var Name = localStorage.getItem('Name');
  var Age = localStorage.getItem('Age');
  var Gender = localStorage.getItem('Gender');
  var img = localStorage.getItem('image');
   db.transaction(function(tx){
      tx.executeSql("INSERT INTO spap_detail (Name, Age, Gender, Photo, Medics, Notes) VALUES (?, ?, ?, ?, ?, ?)",
                     [Name,Age,Gender,img,Medics,Notes],
        function(){
          alert('The note could be saved.');
        }
      );
   });
};

fetchData = function() {
  db.transaction(function(tr) {
    tr.executeSql("SELECT Name,Age,Gender,Photo,Medics,Notes FROM spap_detail",[],
      function(trans, data) {
        for (var i = 0; i < data.rows.length; i++) {
          var row = data.rows.item(i);
          var Name=row['Name'];
          var Age=row['Age'];
          var Gender=row['Gender'];
          var Medics=row['Medics'];
          var Notes=row['Notes'];
          var img = localStorage.getItem('image');
          //console.log(img);

  $('#table_details').append(`<tr><td>${Name}</td>
                              <td>${Age}</td>
                              <td>${Gender}</td>
	                            <td><img src=${img} style="width:30px; height:50px"></td>
                              <td>${Medics}</td>
                              <td>${Notes}</td></tr>`);
        }
      });
  });
};

$(function(){
  connectToDB();
  createTable();
  fetchData();

  $("#save").click(function(){
    var Name = $('#Fname').val();
	var Age = $('#Age').val();
	var Gender = $('#Gender').find(':selected').val();
	 var img = $('#photo').attr('src');
    insertDemo(Name, Age, Gender,img);
  });

 $("#save_vitals").click(function() {
    var Medics = $('#Medics').val();
    var Notes = $('#Notes').val();
    insertVitals(Medics,Notes);
  });
});
