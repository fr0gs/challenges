import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map.Entry;


class Main {

	private static HashMap<String, Integer> map = new HashMap<String, Integer>();
	
	public static String getHighest(){
		int max = -1;
		ArrayList<Entry<String, Integer>> arr = new ArrayList<Entry<String, Integer>>(map.entrySet());
		
		//Ordeno array de mayor a menor por su Value.
		Collections.sort(arr, new EntryCompMax());
		
		//Ordeno en orden descendiente y devuelvo el primero (numero menor)
		Collections.sort(arr, new EntryCompMin());
		
		
		return arr.get(0).getKey();
	}
	
	//Ordena de mayor a menor por Value.
	static class EntryCompMax implements Comparator<Entry<String, Integer>>{
		@Override
		public int compare(Entry<String, Integer> e1, Entry<String, Integer> e2) {
			if (e1.getValue() < e2.getValue())
				return 1;
			else if (e1.getValue() == e2.getValue()) return 0;
			else return -1;
		}
	}
	//ordena de menor a mayor por Key
	static class EntryCompMin implements Comparator<Entry<String, Integer>> {
		@Override
		public int compare(Entry<String, Integer> e1, Entry<String, Integer> e2) {
			if (e1.getValue() == e2.getValue()){
				if (Integer.parseInt(e1.getKey()) < Integer.parseInt(e2.getKey()))
					return -1;
				else return 1;
			}
			else return 0;
		}
	}
		
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        line = br.readLine();
        
        for (String s: line.split("\\s+")) {
        	if (!map.containsKey(s)) map.put(s, new Integer(1));
	    	
        	else { 
	    		Integer aux = map.get(s) + 1;
	    		map.put(s, aux);
	    	}
        }
        System.out.println(getHighest());
	}
}
