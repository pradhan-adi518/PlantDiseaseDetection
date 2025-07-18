package com.KrishiMitra.KrishiMitra.Service;

import com.KrishiMitra.KrishiMitra.CustomExceptionsClasses.UserDisabled;
import com.KrishiMitra.KrishiMitra.Models.User;
import com.KrishiMitra.KrishiMitra.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    UserRepo userRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepo.findByUsername(username);
        System.out.println(user);
        if (user==null){
            throw new UsernameNotFoundException(username);
        }
        if (!user.isEnabled()){
            throw new UserDisabled(user.getUsername());
        }
        return user;
    }
}
