package cr.fi.hp.game.utilities;

import java.util.ArrayList;

import cr.fi.hp.game.entities.Championship;
import cr.fi.hp.game.entities.Player;

public class Constant {

	public final static String SCISSORS = "S";
	public final static String PAPER = "P";
	public final static String ROCK = "R";

	public static final String MAIN_REGEX =  "\\[\\[\"[a-zA-Z]+\",+\"[a-zA-Z]\"],\\[\"[a-zA-Z]+\",+\"[a-zA-Z]\"\\]]";
	public static final String LIST_PLAYER = "\\[\"[a-zA-Z]+\",\"[a-zA-Z]+\"\\]";
	public static final String ELEMENT_REGEX  = "[a-zA-Z]+";
	
	private static Player player1 = new Player("Pedro", "R");
	private static Player player2 = new Player("Carlos", "S");
	private static Player player3 = new Player("Fernando", "P");
	private static Player player4 = new Player("Roy", "S");

	
	public final static ArrayList<Player> listGroup1 = new ArrayList<Player>() {
		{
			add(player1);
			add(player2);
		}
	};
	public final static ArrayList<Player> listGroup2 = new ArrayList<Player>() {
		{
			add(player3);
			add(player4);
		}
	};

}
