package beans.test;

import beans.Player;
import beans.Question;
import beans.Quiz;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author Daniel Klock
 * @version 1.1.0
 */
public class QuizTest {
    private static final Quiz quiz = new Quiz();
    private static final Question question = new Question();
    private static final Player player = new Player();
    private static final List<Question> questions = new ArrayList<>();
    private static final List<Player> players = new ArrayList<>();
    private static final long nowInMills = System.currentTimeMillis();

    @Before
    public void setUp() throws Exception {
        quiz.setId(1);
        quiz.setName("Quiz");
        quiz.setCreator("Daniel");
        quiz.setStartTime(new Date(nowInMills));
        questions.add(question);
        quiz.setQuestions(questions);
        players.add(player);
        quiz.setPlayerList(players);
    }

    /**
     * If this test passes the {@code setId()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getId() throws Exception {
        Assert.assertEquals(1, quiz.getId());
    }

    /**
     * If this test passes the {@code setName()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getName() throws Exception {
        Assert.assertEquals("Quiz", quiz.getName());
    }

    /**
     * If this test passes the {@code setCreator()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getCreator() throws Exception {
        Assert.assertEquals("Daniel", quiz.getCreator());
    }

    /**
     * If this test passes the {@code setStartTime()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getStartTime() throws Exception {
        Assert.assertEquals(new Date(nowInMills), quiz.getStartTime());
    }

    /**
     * If this test passes the {@code setQuestions()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getQuestions() throws Exception {
        Assert.assertArrayEquals(questions.toArray(), quiz.getQuestions().toArray());
    }

    /**
     * If this test passes the {@code setPlayerList()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getPlayerList() throws Exception {
        Assert.assertArrayEquals(players.toArray(), quiz.getPlayerList().toArray());
    }
}
