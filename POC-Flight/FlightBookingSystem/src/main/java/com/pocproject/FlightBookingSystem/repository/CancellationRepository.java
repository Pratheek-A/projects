package com.pocproject.FlightBookingSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pocproject.FlightBookingSystem.model.Cancellation;

@Repository
public interface CancellationRepository extends JpaRepository<Cancellation, Long>{

	@Modifying
	@Query(value="DELETE from cancellations where id=?1", nativeQuery = true)
	void deleteCancellation(@Param("cancellationId") Long cancellationId);

}
