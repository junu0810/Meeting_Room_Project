package com.example.meeting.common;

import java.math.BigInteger;
import java.security.MessageDigest;

public class Util {

    public String MakeCheckSum(String value) {
        String result = null;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            digest.reset();
            digest.update(value.getBytes("utf8"));
            result = String.format("%040x", new BigInteger(1, digest.digest()));
        } catch (Exception e){
            e.printStackTrace();
        }

        return result;
    }


}
