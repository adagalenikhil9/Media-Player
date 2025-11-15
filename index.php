<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" type="text/css" href="./css/style.css">

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

	<title>Mini Player</title>
</head>
<body>
	<div class="site">
	<header>
	    <i class="material-icons">home</i>
        <h1>Welcome On MiniPlayer - ByNikhilAdagale</h1>
        <i class="material-icons">library_music</i>
    </header>

    <div class="contain">
    	

    <div class="left">

    		<div class="valume">
    			<i class="material-icons" id="valumeoff" onclick="stop()">volume_up</i>
    			<input type="range"id="bidi" onchange="Aavaj()">
    		
    	    </div>


            <div class="songnames">
                <h2 id="gana">Shravan Mahina</h2>
                <br>
                <h3 id="lyrics"></h3>
            </div>

    	<div class="song-img">
            <img src="img6" id="ganaimg">

    	</div>
    	<div class="range">
    		<input type="range" name="progress" id="kadi" value="0" min="0" oninput="songdur()">
    	</div>

    	<div class="playpause">
    		<i class="material-icons" onclick="privious()">skip_previous</i>
            
    		<i class="material-icons" id="masterplay" onclick="startstop()">
            play_circle</i>

            <i class="material-icons" onclick="Next()">skip_next</i>
            
    	</div>
        
    </div>
    
    <div class="right">
    		<div class="bar" >
                <img src="./css/images/gif" id="musicanim">
    			
    		</div>
    	</div>
    

	</div>

	</div>

    

<script src="./scripts/script.js"></script>
</body>
</html>