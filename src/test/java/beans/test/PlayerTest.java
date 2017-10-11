package beans.test;

import beans.Player;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

/**
 * @author Daniel Klock
 * @version 0.1.0
 */
public class PlayerTest {
    private static final Player player = new Player();

    @Before
    public void setUp() throws Exception {
        player.setNickname("Daniel");
        player.setPoints(1);
    }

    /**
     * If this test passes the {@code setNickname()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getNickname() throws Exception {
        Assert.assertEquals("Daniel", player.getNickname());
    }

    /**
     * If this test passes the {@code setPoints()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getPoints() throws Exception {
        Assert.assertEquals(1, player.getPoints());
    }
}
