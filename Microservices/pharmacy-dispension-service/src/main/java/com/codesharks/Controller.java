package com.codesharks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(path = "/dispense/{id}")
    public @ResponseBody boolean getPrescriptionTotal(@PathVariable String id){

        prescriptions reqPresc = pr.getByPreId(id);
        List<presc_items> allItems = ir.getByPreId(id);

        System.out.println("Req: " + id);

        int total = 0;

        for (int i = 0; i < allItems.size(); i++){

            presc_items currentItem = allItems.get(i);

            total += currentItem.getTotalPrice();

            System.out.println("Current Total: " + currentItem.getTotalPrice());            

            items changingItem = sr.getByName(currentItem.getDrug());
            changingItem.setAvailable(changingItem.getAvailable() - currentItem.getQuantity());

            sr.deleteByName(currentItem.getDrug());
            sr.save(changingItem);

        }

        System.out.println("Final Total: " + total);
        reqPresc.setTotal(total);

        pr.deleteByPreId(id);
        pr.save(reqPresc);


        return true;
    }
}
