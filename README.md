Export a log file with this command
```shell
svn log --search your.username --verbose -r {initial date ex: 2015-01-10}:{final date ex: 2015-12-01} > ~/path-to-the-parser/svn-log.log
```

Run the script
```shell
node parser.js
```

Create a index.html and put the content of file final.html on the file
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>SVN Log</title>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">
</head>
<body>
	<section class="container">
		<div class="page-header">
			<h3>Commits table</h3>
		</div>
		<table class="table table-bordered">
			<thead>
				<tr>
					<th>Revision</th>
					<th>Date</th>
					<th>Working hours</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<!-- put here the generated file -->
				<!-- this file will be automatic generated on the next version -->
			</tbody>
		</table>
	</section>
</body>
</html>
```

### Todo:
- [ ] Generate a complete HTML not just the <tr> to use on a <table>