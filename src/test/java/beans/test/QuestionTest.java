package beans.test;

import beans.Question;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Daniel Klock
 * @version 1.1.0
 */
public class QuestionTest {
    private static final Question question = new Question();
    private static final List<String> answers = new ArrayList<>();

    @Before
    public void setUp() throws Exception {
        question.setId(1);
        question.setQuestion("Quiz question.");
        question.setImageURL("https://www.w3schools.com/css/img_fjords.jpg");
        question.setAnswers(answers);
        question.setPoints(2);
        question.setCorrectAnswerIndex(0);
        question.setDuration(10);
    }

    /**
     * If this test passes the {@code setId()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getId() throws Exception {
        Assert.assertEquals(1, question.getId());
    }

    /**
     * If this test passes the {@code setQuestion()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getQuestion() throws Exception {
        Assert.assertEquals("Quiz question.", question.getQuestion());
    }

    /**
     * If this test passes the {@code setImageURL()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getImageURL() throws Exception {
        Assert.assertEquals("https://www.w3schools.com/css/img_fjords.jpg", question.getImageURL());
    }

    /**
     * If this test passes the {@code setAnswers()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getAnswers() throws Exception {
        Assert.assertArrayEquals(answers.toArray(), question.getAnswers().toArray());
    }

    /**
     * If this test passes the {@code setPoints()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getPoints() throws Exception {
        Assert.assertEquals(2, question.getPoints());
    }

    /**
     * If this test passes the {@code setCorrectAnswerIndex()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getCorrectAnswerIndex() throws Exception {
        Assert.assertEquals(0, question.getCorrectAnswerIndex());
    }

    /**
     * If this test passes the {@code setDuration()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getDuration() throws Exception {
        Assert.assertEquals(10, question.getDuration());
    }
}
