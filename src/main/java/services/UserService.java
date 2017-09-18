package services;

import beans.User;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Daniel Klock
 * @version 0.1.0
 *
 * REST service class that defines operations available for the User resource.
 * This class defines those operations based on the CRUD standard.
 */
@Path("/user/")
public class UserService {
    // TODO: Implement a database solution.
    // TODO: Implement authentication.
    private static final Map<Integer, User> users = new HashMap<>();

    /**
     * List all users.
     * @return Returns a {@code List} that contains all the {@code User} objects,
     *         on the server. This list is converted to JSON by Jax-RS.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getUsers() {
        List<User> list = new ArrayList<>();
        list.addAll(users.values());
        return list;
    }

    /**
     * Get a specific user given a id.
     * @param id - The id of the desired {@code User} object.
     * @throws NotFoundException - No user with the given id was found.
     * @return A {@code User} object.
     */
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public User getUser(@PathParam("id") int id) {
        User user = users.get(id);
        if (user == null) {
            throw new NotFoundException("A user with id of " + id + ", was not found.");
        }
        return user;
    }

    /**
     * Create a new user.
     * @param user - The user to add to the database.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createUser(User user) {
        User found = users.get(user.getId());
        if (found == null) {
            users.put(user.getId(), user);
        }
    }

    /**
     * Update the data of an existing user.
     * @throws NotFoundException - If the given id is not found in the database.
     * @param id    - The id of the user to change.
     * @param user  - The new {@code User} object.
     */
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateUser(@PathParam("id") int id, User user) {
        User found = users.get(id);
        if (found == null) {
            throw new NotFoundException("Could not find a user with id " + id + ".");
        }
        found.setNickname(user.getNickname());
        users.put(id, found);
    }

    /**
     * Delete a user.
     * @param id - The id of the user to delete.
     */
    @DELETE
    @Path("/{id}")
    public void deleteUser(@PathParam("id") int id) {
        users.remove(id);
    }
}
