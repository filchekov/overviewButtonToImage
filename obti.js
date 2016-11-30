function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
	);
}

function overviewButtonToImage(input_id_or_element, image_url, image_new_id = null, out_id_or_element = null, image_width = null, image_height = null){
	var input;
	if (!isElement(input_id_or_element))
		input = document.getElementById(input_id_or_element);
	else
		input = input_id_or_element;
		
	var inputCoord = { 
			top: parseInt(input.getBoundingClientRect().top),
			left: parseInt(input.getBoundingClientRect().left)	
		};	
	var inputParent = input.parentNode;
	var imageTag = document.createElement('img');
	
	inputParent.insertBefore(imageTag, input);
	imageTag.src = image_url;
	
	var cssSting = 'top:' + inputCoord.top + 'px; left:' + inputCoord.left + 'px; ';
	
	if (null != image_width)
		cssSting += 'width:' + image_width + 'px; ';
		
	if (null != image_height)
		cssSting += 'height:' + image_height + 'px; ';
	
	imageTag.style.cssText = cssSting;
	input.style.cssText = 'position:absolute; top:-1000px;';
	
	if (null != image_new_id)
		imageTag.setAttribute("id", image_new_id);
	
	imageTag.onclick = function(){
		input.click();
	}
	
	var outElement;
	
	if (!isElement(out_id_or_element))
		outElement = document.getElementById(out_id_or_element);
	else
		outElement = out_id_or_element;
	
	var spanTag = document.createElement('span');
	
	if (null == out_id_or_element){
		inputParent.insertBefore(spanTag, imageTag.nextSibling);
		outElement = spanTag;
	}
		
	input.onchange = function(){
		outElement.innerHTML = input.value;
	}
}

overviewButtonToImage("inf", "bimage.png", "my");
