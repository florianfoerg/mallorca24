package com.florianfoerg.jacocotest;

public class Mail {

    public static String sendMail(final String mail) {
        if(mail == null) {
            return "You can only send a valid mail!";
        }
        return "Mail successfully sent!";
    }

}
