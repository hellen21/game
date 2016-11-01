package cr.fi.hp.game.entities;

import java.util.ArrayList;
import java.util.Vector;

public class Championship extends Player{

	private Vector<ArrayList<Player>> Championship;
	
	
	public Championship() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Championship(String name, String strategy) {
		super(name, strategy);
		// TODO Auto-generated constructor stub
	}

	public Vector<ArrayList<Player>> getChampionship() {
		return Championship;
	}

	public void setChampionship(Vector<ArrayList<Player>> championship) {
		Championship = championship;
	}

	
	
}
