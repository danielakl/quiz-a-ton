package rest;

import javax.ws.rs.HttpMethod;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * PATCH HTTP method declaration. PATCH is used to partially update a resource.
 * Found on: https://stackoverflow.com/questions/17897171/how-to-have-a-patch-annotation-for-jax-rs
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@HttpMethod("PATCH")
public @interface PATCH { }