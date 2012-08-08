$("#insert").click(insert);
$("#read").click(read);

persistence.debug = false;
persistence.store.websql.config(persistence, 'testdb', 'local database', 5 * 1024 * 1024);

var db = {
	table: {
		Model: persistence.define('test_Model', {
			Name: "TEXT",
			ParentKey: "INT",
		})
	}
}

db.table.Model.index(['Name'], {
	unique: true
});

function insert() {
	for (var i = 1; i < 51; ++i) {
		var model = new db.table.Model();
		model.Name = 'Model ' + i;
		model.ParentKey = 5;
		
		console.log("Before add: " + model.Name + " " + model.ParentKey);
		persistence.add(model);
		
		var ab = model.toJSON();
		console.log("After add: " + ab.Name + " " + ab.ParentKey);
	}

	persistence.flush();
}

function read() {
	var result = db.table.Model.all();

	result.list(function(models) {
		models.forEach(function(model) {
			var ab = model.toSecureJSON();
			console.log(ab.Name + " " + ab.ParentKey);
		});
	});
}

$(document).ready(function() {
	persistence.schemaSync();
});
