package beans.test;

import beans.User;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

/**
 * @author Daniel Klock
 * @version 0.1.0
 */
public class UserTest {
    private final User user = new User();

    @Before
    public void setUp() throws Exception {
        user.setId(1);
        user.setNickname("Daniel");
    }

    /**
     * If this test passes the {@code setId()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getId() throws Exception {
        Assert.assertEquals(1, user.getId());
    }

    /**
     * If this test passes the {@code setNickname()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getNickname() throws Exception {
        Assert.assertEquals("Daniel", user.getNickname());
    }
}
