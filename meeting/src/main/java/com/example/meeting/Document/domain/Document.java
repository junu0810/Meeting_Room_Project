package com.example.meeting.Document.domain;


import com.example.meeting.Question.domain.Question;
import com.example.meeting.Room.domain.Room;
import com.example.meeting.User.domain.User;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name="uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID uuid;

    @Column(name = "document_name")
    private String document_name;

    @Column(name = "writer")
    private String writer;

    @Column(name = "rewriter" )
    @Nullable
    private String rewriter;

    @Builder.Default
    @OneToMany(mappedBy = "document", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Question> QuestionList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_uuid")
    private User user;

}
