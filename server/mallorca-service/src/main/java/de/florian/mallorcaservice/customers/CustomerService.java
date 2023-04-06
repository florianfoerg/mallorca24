package de.florian.mallorcaservice.customers;

import de.florian.mallorcaservice.customers.model.Customer;
import de.florian.mallorcaservice.customers.model.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CustomerService {

    private CustomerRepository customerRepository;

    public void addCostumer(String mail){
        //it is impossible that different customers have an identical e-mail address
        if(!customerRepository.findCustomerByMail(mail).isEmpty()) {
            return;
        }

        Customer newCostumer = new Customer();
        newCostumer.setMail(mail);

        customerRepository.save(newCostumer);
    }
}
