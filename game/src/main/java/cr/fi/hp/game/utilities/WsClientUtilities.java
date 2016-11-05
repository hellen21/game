package cr.fi.hp.game.utilities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpEntity;

import cr.fi.hp.game.entities.Championship;
import cr.fi.hp.game.entities.Player;

public interface WsClientUtilities {	

	public Player searchWin(List<Player> players);
	public boolean validateStrategy(ArrayList<Player> players);
	public Player searchWinChampions(ArrayList<Championship> listChampions);
	public boolean validateStrategy(Player[] players);
	public Player searchWin(Player[] players);
	public Object functionRecursive(ArrayList<Player> playersList);
	public ArrayList<Player> searchWinners(ArrayList<Player> playersList);

}
