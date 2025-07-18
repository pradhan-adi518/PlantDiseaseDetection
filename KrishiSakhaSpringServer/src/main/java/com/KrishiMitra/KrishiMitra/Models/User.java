package com.KrishiMitra.KrishiMitra.Models;


import com.KrishiMitra.KrishiMitra.DTO.AddressDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class
User implements UserDetails {
    @Id
    private String Id;

    private String username;

    @JsonIgnore
    private String password;

    private boolean isEnabled;
    private String email;

    private String phone;
    private AddressDTO address;
    private String name;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }
}

