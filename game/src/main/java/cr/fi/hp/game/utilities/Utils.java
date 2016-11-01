package cr.fi.hp.game.utilities;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import cr.fi.hp.game.entities.Player;



public class Utils {
	
	public ArrayList<Player> searchMath(String resp) {
		Player matPlayer= new Player();
		Pattern pattern = Pattern.compile(Constant.MAIN_REGEX);
		/*resp.*/
		Matcher match = pattern.matcher(resp);
		while (match.find()) {
			String tag = "";
			String id = "";

			String text = match.group();
			pattern = Pattern.compile(Constant.LIST_PLAYER);
			Matcher m = pattern.matcher(text);
			while (m.find()) {
				text = m.group();
				String text1 = match.group();
				pattern = Pattern.compile(Constant.ELEMENT_REGEX);
				Matcher m2 = pattern.matcher(text1);
				boolean isSecond = false;
				while (m2.find()) {
					text1= m2.group();
					if(isSecond){
						matPlayer.setStrategy(text1);
					}else {
						matPlayer.setName(text1);
						isSecond = true;
					}
				
				}
				
			}

			/*pattern = Pattern.compile(Constant.TAG_REGEX);
			m = pattern.matcher(text);
			if (m.find()) {
				tag = m.group();
			}

			pattern = Pattern.compile(Constant.ID_REGEX);
			m = pattern.matcher(text);
			if (m.find()) {
				id = m.group();
			}*/

			/*Tags currentTag = Tags.valueOf(tag.toUpperCase());
			switch (currentTag) {
			case SLIDER:
				sliderList.add(id);
				break;
			case CASILLA:
				casillaList.add(id);
				break;
			case CARROUSEL:
				carouselList.add(id);
				break;
			}*/
		}
	/*	matContent.setCarouselList(carouselList);
		matContent.setCasillaList(casillaList);
		matContent.setSliderList(sliderList);*/
		return null;
	}
	
}





