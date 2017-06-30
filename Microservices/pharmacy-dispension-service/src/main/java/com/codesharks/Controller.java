package com.codesharks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

/**
 * Created by Lanil Marasinghe on 30-Jun-17.
 */
@CrossOrigin
@RestController
@RequestMapping(path = "api/")
public class Controller {

    @Autowired
    private PrescriptionsRepository pr;

    @Autowired
    private ItemsRepository ir;

    @Autowired
    private StockRepository sr;

    @Autowired
    private PatientsRepository patientsRepositoryr;

    @PostMapping(path = "/dispense/{id}")
    public @ResponseBody boolean getPrescriptionTotal(@PathVariable String id){

        prescriptions reqPresc = pr.getByPreId(id);
        List<presc_items> allItems = ir.getByPreId(id);

        System.out.println("Request Received For: " + id);

        int total = 0;

        for (int i = 0; i < allItems.size(); i++){

            presc_items currentItem = allItems.get(i);

            total += currentItem.getTotalPrice();

            System.out.println("Total For : " + currentItem.getDrug() + " Is: " + currentItem.getTotalPrice());

            items changingItem = sr.getByName(currentItem.getDrug());

            System.out.println("Already Available: " + changingItem.getAvailable());

            changingItem.setAvailable(changingItem.getAvailable() - currentItem.getQuantity());

            System.out.println("Now Available: " + changingItem.getAvailable());

            sr.deleteByName(currentItem.getDrug());
            sr.save(changingItem);

        }

        System.out.println("Final Total: " + total);
        reqPresc.setTotal(total);

        pr.deleteByPreId(id);
        pr.save(reqPresc);


        return true;
    }

    @GetMapping(path = "/sales")
    public @ResponseBody int getTotalSales(){

        int total = 0;

        Iterable<prescriptions> allPrescs = pr.findAll();
        Iterator<prescriptions> prescIterator = allPrescs.iterator();

        while(prescIterator.hasNext()){
            total += prescIterator.next().getTotal();
        }

        return total;
    }

    @GetMapping(path = "/stock")
    public @ResponseBody int getTotalStock(){
        int total = 0;

        Iterable<items> allItems = sr.findAll();
        Iterator<items> itemsIterator = allItems.iterator();

        while(itemsIterator.hasNext()){
            total += (itemsIterator.next().getPrice() * itemsIterator.next().getAvailable());
        }

        return total;
    }

    @GetMapping(path = "/patients")
    public @ResponseBody int getPatientsCount(){
        int count = 0;

        Iterable<patients> allPats = patientsRepositoryr.findAll();
        Iterator<patients> patientsIterator = allPats.iterator();

        while (patientsIterator.hasNext()){
            count++;
        }

        return count;
    }
}
