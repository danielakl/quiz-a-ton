package beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;

/**
 * @author Daniel Klock
 * @version 0.1.0
 *
 * User bean class following official JavaBean specification found at:
 * "http://www.oracle.com/technetwork/articles/javaee/spec-136004.html".
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class User implements Serializable {
    @XmlElement(name = "id")
    private int id;

    @XmlElement(name = "nickname")
    private String nickname;

    /*
     * Getters
     */
    public int getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    /*
     * Setters
     */
    public void setId(int id) {
        this.id = id;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
